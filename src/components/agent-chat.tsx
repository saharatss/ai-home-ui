'use client'

import { Button, Input } from "@heroui/react";
import { useEffect, useRef, useState } from "react";
import { Icons } from "./icons";
import AgentChatEntry from "./agent-chat-entry";

export const AgentChat = () => {

	const [userInput, setUserInput] = useState<string>("");

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
		console.log("Sending message:", userInput);
		scrollToBottom();
		setUserInput("");
	}

	return (
		<div
			ref={mainContainer}
			className="w-full mx-auto h-full overflow-auto relative"
			style={{
				scrollBehavior: 'smooth'
			}}
		>
			<div className="flex max-w-lg mx-auto min-h-[calc(100svh-12em)] flex-col gap-6 px-4 pt-10 items-center justify-center">
				{/* {Array.from({ length: 10 }, (_, i) => (
					<AgentChatEntry key={i} message={{
						userId: "AI",
						message: `HELLO ${i}`
					}} />
				))} */}

				<AgentChatEntry message={{
					userId: "AI",
					message: `
					<h1>Hello there!</h1><p>Good day! It's currently 12:04 PM. I've checked your home devices, and here's a quick status update:</p><ul><li>Smart Light 1: Currently ON (80% brightness, white color)</li><li>Smart Light 2: Currently OFF</li></ul><p>How can I assist you with your smart home today?</p>
					`
				}} />

				<AgentChatEntry message={{
					userId: "test",
					message: `Hello`
				}} />

				{/* <AgentChatEntry message={{
					userId: "AI",
					message: `<h1>Welcome to Your Smart Home Assistant!</h1> <p>Good morning! It's currently May 6th, 2025. Here's a quick overview of your home devices:</p> <table> <thead> <tr> <th>Device Name</th> <th>Type</th> <th>Current Status</th> </tr> </thead> <tbody> <tr> <td>Smart Light 1</td> <td>Light</td> <td>On (80% brightness, white)</td> </tr> <tr> <td>Smart Light 2</td> <td>Light</td> <td>Off</td> </tr> </tbody> </table> <p>How can I help you today?</p>`
				}} /> */}

				<AgentChatEntry message={{
					userId: "AI",
					message: `<h1>House Device Summary</h1><card><h2>Current Status Overview</h2><p>As of May 6, 2025, at 11:45 AM, here's a summary of your smart home devices:</p><table><thead><tr><th>Device Name</th><th>Type</th><th>Power Status</th><th>Additional Details</th></tr></thead><tbody><tr><td>Smart Light 1</td><td>Light</td><td>On</td><td>Brightness: 80%, Color: White</td></tr><tr><td>Smart Light 2</td><td>Light</td><td>Off</td><td>Brightness: 0%</td></tr></tbody></table><p>Both devices have remote control enabled with a scheduled operation from 6:00 PM to 10:00 PM.</p></card>
					`
				}} />

			</div>

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
					className="flex items-center justify-center rounded-full text-white bg-black hover:bg-gray-600 hover:!opacity-100 transition duration-200 gap-1 mb-6 pl-3 pr-4"
					onPress={scrollToBottom}
				>
					<Icons.ArrowDownIcon color="white" strokeWidth={2.5} size={18} />
					Scroll to Bottom
				</Button>
			</div>

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
							mainWrapper: "w-full bg-white rounded-full shadow-[0px_2px_20px_rgba(0,0,0,0.1)]",
							inputWrapper: "bg-white rounded-full shadow-none pl-6 pr-3 my-2 data-[hover=true]:bg-unset group-data-[focus=true]:bg-unset",
							input: "font-light placeholder:text-default-400",
						}}
						size="lg"
						placeholder="Chat with your house..."
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
								className="flex items-center justify-center w-10 h-10 rounded-full bg-black hover:bg-blue-600 transition duration-200"
								onPress={() => {
									handleUserInputSubmit();
								}}
							>
								<Icons.ArrowRightIcon color="white" strokeWidth={3} />
							</Button>
						}
					/>
					<div className="text-xs text-default-400 text-center">Our agents can make mistakes. Check important info. Now using agent: Default.</div>
				</div>
			</div>

		</div>
	);
}