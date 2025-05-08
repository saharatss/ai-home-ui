'use client'

import { Button, Input, Spinner } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import Icons from "../icons";
import AgentChatEntry from "./agent-chat-entry";
import { AgentMessage, AgentSession } from "@/types/agent";
import AgentAPI from "@/api/agent";
import { SidebarDivider, SidebarMenuItem } from "../sidebar";
import { useRouter } from "next/router";

export const AgentChat = () => {
	const router = useRouter();

	const [userInput, setUserInput] = useState<string>("");
	
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isThinking, setIsThinking] = useState<boolean>(false);

	const [agentSessions, setAgentSessions] = useState<AgentSession[]>([]);
	const [activeSession, setActiveSession] = useState<AgentSession | null>(null);
	const [activeSessionName, setActiveSessionName] = useState<string>("");

	const [agentMessages, setAgentMessages] = useState<AgentMessage[]>([]);

	useEffect(() => {
		const fetchAgentSessions = async () => {
			setIsLoading(true);
			const sessions = await AgentAPI.listAgents();
			setAgentSessions(sessions);
			console.log("Fetched agent sessions:", sessions);
			setIsLoading(false);
		};
		fetchAgentSessions();
	}, []);

	const createSession = async () => {
		setIsLoading(true);
		const newSession = await AgentAPI.createAgent(`Agent ${agentSessions.length + 1}`);
		if (newSession) {
			setAgentSessions(prevSessions => [...prevSessions, newSession]);
			setActiveSession(newSession);
			await invokeAgent(newSession.id, `HELLO`);
		}
		setIsLoading(false);
	};

	const updateSessionName = async (sessionId: string, name: string) => {
		if (name.trim() === "") return;
		setIsLoading(true);
		const updatedSession = await AgentAPI.updateAgentName(sessionId, name);
		if (updatedSession) {
			setAgentSessions(prevSessions => {
				const updatedSessions = [...prevSessions];
				const index = updatedSessions.findIndex(session => session.id === sessionId);
				if (index !== -1) {
					updatedSessions[index] = updatedSession;
				}
				return updatedSessions;
			});
		}
		setIsLoading(false);
	};

	const invokeAgent = async (sessionId: string, message: string) => {
		setIsThinking(true);
		setAgentMessages(prevMessages => [
			...prevMessages,
			{
				id: "",
				userId: localStorage.getItem("userId") || "",
				sessionId,
				message,
				timestamp: new Date().toISOString(),
			},
		]);
		const response:AgentMessage = await AgentAPI.invokeAgent(sessionId, message);
		if (response) {
			setAgentMessages(prevMessages => [...prevMessages, response]);
			setAgentSessions(prevSessions => {
				const updatedSessions = [...prevSessions];
				const index = updatedSessions.findIndex(session => session.id === sessionId);
				if (index !== -1) {
					updatedSessions[index].updatedDate = response.timestamp || "";
				}
				return updatedSessions;
			});
			setTimeout(() => {
				setUserInput("");
				scrollToBottom();
				if(response.actions && response.actions.length > 0) {
					response.actions.forEach((action) => {
						if (action.action === "ui_open") {
							console.log("AGENT_ACTION UI open action:", action);
							router.push(`/${action.panel}`);
						} else if (action.action === "device_update") {
							// Handle update device action
							console.log("AGENT_ACTION Update device action:", action);
						}
					});
				}
			}, 100);
		}
		setIsThinking(false);
	};
	

	const deleteSession = async (sessionId: string) => {
		setIsLoading(true);
		const response = await AgentAPI.deleteAgent(sessionId);
		console.log("Deleted session:", response);
		if (response) {
			setAgentSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId));
			setActiveSession(null);
			setAgentMessages([]);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		if (isLoading) return;
		if (agentSessions.length > 0) {
			setActiveSession(agentSessions[0]);
		} else {
			createSession();
		}
		// eslint-disable-next-line
	}, [agentSessions]);

	useEffect(() => {
		if (activeSession) {
			setActiveSessionName(activeSession.name ?? "Unknown");

			const fetchAgentMessages = async () => {
				setIsLoading(true);
				const messages = await AgentAPI.getAgentMessages(activeSession.id);
				if (messages) {
					setAgentMessages(messages);
					setTimeout(() => {
						// scrollToBottom();
						handleScroll();
					}
					, 100);
				}
				setIsLoading(false);
			};
			fetchAgentMessages();
		}
	}, [activeSession]);

	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
	useEffect(() => {
		if (router.pathname === '/') {
			setIsSidebarOpen(true);
		} else {
			setIsSidebarOpen(false);
		}
	}, [router.pathname]);

	const mainContainer = useRef<HTMLDivElement>(null);
	const [isBottom, setIsBottom] = useState<boolean>(true);
	const handleScroll = () => {
		if (mainContainer.current) {
			const { scrollTop, scrollHeight, clientHeight } = mainContainer.current;
			if (scrollTop + clientHeight >= scrollHeight - 10) {
				setIsBottom(true);
			} else {
				setIsBottom(false);
			}
		}
	};
	useEffect(() => {
		if (mainContainer.current) {
			const container = mainContainer.current;
			container.addEventListener("scroll", handleScroll);
			return () => {
				container.removeEventListener("scroll", handleScroll);
			};
		}
	}, []);
	const scrollToBottom = () => {
		if (mainContainer.current) {
			mainContainer.current.scrollTop = mainContainer.current.scrollHeight;
		}
	};

	const handleUserInputSubmit = () => {
		if (userInput.trim() === "") return;
		if (!activeSession) return;
		scrollToBottom();
		invokeAgent(activeSession?.id || "", userInput);
	}

	return (
		<div className="w-full h-full flex flex-row gap-0 items-center justify-center">
			<div
				ref={mainContainer}
				className="w-full mx-auto h-full overflow-auto relative"
				style={{
					scrollBehavior: 'smooth'
				}}
			>

				{/* Main chat area */}
				<div className="flex max-w-lg mx-auto min-h-[calc(100svh-12em-0.5em)] flex-col gap-0 px-4 pt-10 items-center justify-center">

					{isLoading ? (
						<Spinner size="lg" variant='wave' />
					) : (
						<>
							{agentMessages.length === 0 && !(isLoading || isThinking) && (
								<div className="text-sm text-default-400 text-center">No message</div>
							)}
							{agentMessages.map((message, index) => (
								<AgentChatEntry
									key={index}
									index={index}
									agentMessage={message}
									showSuggestions={index === agentMessages.length - 1 && !isThinking}
									onSuggestionSelected={(suggestion) => {
										if (activeSession) {
											invokeAgent(activeSession.id, suggestion);
										}
									}}
								/>
							))}

							{isThinking && (
								<div className="w-full flex items-center justify-center mt-10">
									<Spinner size="lg" variant='wave' />
								</div>
							)}

						</>
					)}

				</div>

				{/* Scroll to bottom button */}
				<div
					className={`
						sticky bottom-20 mx-auto w-full max-w-lg p-4 z-10 flex justify-center items-center 
						transition-all duration-300 ease-in-out
						${isBottom ? 'opacity-0 translate-y-12 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}
					`}
				>
					<Button
						size="sm"
						variant="flat"
						className="
							text-white bg-black
							flex items-center justify-center rounded-full
							gap-1 mb-8 pl-3 pr-4
							shadow-[0px_0px_60px_40px_rgba(255,255,255,1)]
							hover:bg-default-800 hover:!opacity-100
							transition duration-200"
						onPress={scrollToBottom}
					>
						<Icons.ArrowDownIcon color="white" strokeWidth={2.5} size={18} />
						Scroll to Bottom
					</Button>
				</div>

				{/* Input field */}
				<div
					className="sticky bottom-0 left-0 w-full h-28 p-4 pt-0 z-10 shadow-lg shadow-default-200"
				>
					<div
						className="absolute w-full h-20 left-0 top-8 bg-red-500"
						style={{background: "var(--background)"}}
					/>
					<div className="relative w-full max-w-lg mx-auto flex flex-col gap-2 items-center justify-center">
						<Input
							classNames={{
								base: "!opacity-100",
								mainWrapper: "w-full bg-white rounded-full shadow-[0px_2px_20px_rgba(0,0,0,0.1)]",
								inputWrapper: "bg-white rounded-full shadow-none pl-6 pr-3 my-2 data-[hover=true]:bg-unset group-data-[focus=true]:bg-unset",
								input: "font-light placeholder:text-default-400",
							}}
							size="lg"
							placeholder="Chat with your house..."
							isDisabled={isLoading || isThinking}
							value={userInput}
							onChange={(e) => setUserInput(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									handleUserInputSubmit();
								}
							}}
							endContent={
								<Button
									variant='flat'
									isIconOnly
									isDisabled={isLoading || isThinking}
									className="flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-blue-600 transition duration-200"
									onPress={() => {
										handleUserInputSubmit();
									}}
								>
									<Icons.ArrowRightIcon color="white" strokeWidth={3} />
								</Button>
							}
						/>
						<div className="text-xs text-default-400 text-center">Our agents can make mistakes. Check important info. Now using : {activeSession?.name ?? "Unknown"}.</div>
					</div>
				</div>

			</div>

			{/* Sidebar */}
			<div className={`
				overflow-hidden
				${isSidebarOpen ? 'min-w-48 max-w-48' : 'min-w-0 max-w-0 w-0 opacity-0'}
				transition-all duration-300 ease-in-out
				flex flex-col px-6 gap-3`}>

				<Button
					variant="light"
					className="flex items-center justify-start rounded-lg gap-1 px-4"
					isDisabled={isLoading}
					onPress={() => { 
						createSession();
					}}
				>
					<Icons.PlusIcon color="black" strokeWidth={2.5} size={18} />
					New Session
				</Button>

				<SidebarDivider />

				{agentSessions.length === 0 ? (
					<div className="text-sm text-default-400 text-center">No Session</div>
				) : (
					<div className="flex flex-col">
						{agentSessions
							.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
							.slice(0, 5)
							.map((session) => (
							<SidebarMenuItem 
								key={session.id}
								isSelected={session.id === activeSession?.id}
								onPress={() => {
									setActiveSession(session);
								}}
							>
								<div className="flex flex-col">
									<div className="text-nowrap">
										{session.name ?? "Unknown"}
									</div>
									<div className="text-xs text-nowrap">
										{new Date(session.updatedDate).toLocaleString("en-US", {
											month: 'short',
											day: 'numeric',
											weekday: "short",
											hour: "2-digit",
											minute: "2-digit",
										})}
									</div>
								</div>
							</SidebarMenuItem>
						))}
					</div>
				)}

				<SidebarDivider />

				{activeSession != null ? (<>
					<div className="w-full flex flex-col gap-0 px-4">

						<div className="text-xs text-default-400 text-nowrap mt-2">Name</div>
						<div className="text-sm text-default-400 text-nowrap">
							<input
								type="text"
								className="w-full bg-transparent focus:text-default-900 focus:outline-none"
								value={activeSessionName}
								onChange={(e) => {
									setActiveSessionName(e.target.value);
								}}
								onBlur={() => {
									updateSessionName(activeSession.id, activeSessionName ?? "Untitled");
									if (activeSessionName.trim() === "") {
										setActiveSessionName(activeSession.name ?? "Unknown");
									}
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										updateSessionName(activeSession.id, activeSessionName ?? "Untitled");
									}
								}}
							/>
						</div>
						
						<div className="text-xs text-default-400 text-nowrap mt-2">ID</div>
						<div className="text-sm text-default-400 text-nowrap">{activeSession.id.substring(0, 8).toLocaleUpperCase()}...</div>

						<div className="text-xs text-default-400 text-nowrap mt-2">Created</div>
						<div className="text-sm text-default-400 text-nowrap">{new Date(activeSession.createdDate).toLocaleString("en-US", {
							month: 'short',
							day: 'numeric',
							weekday: "short",
							hour: "2-digit",
							minute: "2-digit",
						})}</div>

						<div className="text-xs text-default-400 text-nowrap mt-2">Updated</div>
						<div className="text-sm text-default-400 text-nowrap">{new Date(activeSession.updatedDate).toLocaleString("en-US", {
							month: 'short',
							day: 'numeric',
							weekday: "short",
							hour: "2-digit",
							minute: "2-digit",
						})}</div>

					</div>
					<Button
							variant="light"
							color="danger"
							className="w-full flex items-center justify-start rounded-lg gap-1 px-4"
							isDisabled={isLoading}
							onPress={() => { 
								deleteSession(activeSession.id);
							}}
						>
							{/* <Icons.TrashIcon color="black" strokeWidth={2.5} size={18} /> */}
							Delete Session
						</Button>
				</>) : (
					<div className="text-sm text-default-400">
						No Active Session
					</div>
				)}

			</div>
			
		</div>
	);
}