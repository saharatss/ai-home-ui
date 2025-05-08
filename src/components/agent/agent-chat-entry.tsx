'use client';
import parse, { DOMNode, domToReact } from 'html-react-parser';
import { AgentAction, AgentMessage } from '@/types/agent';
import type { Element } from 'domhandler';
import React from 'react';
import { Button  } from '@heroui/react';
import { motion } from 'framer-motion';
import { useDevices } from '@/context/device';
import Icons from '../icons';

const fadeSlideUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};


export default function AgentChatEntry({
	index = 0,
	agentMessage,
	className = '',
	showSuggestions = false,
	onSuggestionSelected,
}: {
	index?: number;
	agentMessage: AgentMessage;
	className?: string;
	showSuggestions?: boolean;
	onSuggestionSelected?: (suggestion: string) => void;
}) {

	const { getDeviceById } = useDevices();

	const styledElements: Record<string, string> = {
		h1: "text-4xl font-light tracking-wide",
		h2: "text-lg  font-medium",
		p: "text-lg/6 font-light",
		strong: "font-medium",
		em: "italic",
		ul: "list-disc list-inside pl-4",
		ol: "list-decimal list-inside pl-4",
		li: "text-base",
		code: "bg-gray-100 p-1 rounded text-sm",
		pre: "bg-gray-100 p-2 rounded text-sm overflow-auto",
		img: "max-w-full h-auto rounded-lg",
		a: "text-blue-500 hover:underline",
		table: "w-full border-collapse",
		th: "border border-gray-200 bg-gray-50 p-2 text-sm text-left font-medium",
		td: "border border-gray-200 bg-white p-2 text-sm",
	};

	const parseOptions = {
		replace: (domNode: DOMNode): string | boolean | void | object | Element | null => {
			if (domNode.type === 'tag') {
				const el = domNode as Element;
				const tagName = el.name;

				if (tagName === 'card') {
					// const props = { ...el.attribs };
					return (
						<div className='flex flex-col gap-3 p-4 rounded-xl bg-white'>
							{domToReact(el.children as DOMNode[], parseOptions)}
						</div>
					);
				}

				// Default styled HTML tag mapping
				const className = styledElements[tagName];
				if (className) {
					return React.createElement(
						tagName,
						{ className, ...el.attribs },
						domToReact(el.children as DOMNode[], parseOptions)
					);
				}
			}

			return null;
		},
	};

	const renderHtml = (html: string) => {
		try {
			return parse(html, parseOptions);
		} catch (error) {
			console.warn('Error parsing HTML:', error);
			return (<div>Something went wrong while rendering the message.</div>);
		}
	};
	

	return (<>
		{agentMessage.userId == null && (
			<motion.div
				initial="hidden"
				animate="visible"
				variants={fadeSlideUp}
				className={`mt-10 ${index === 0 ? 'pt-10' : ''} w-full flex flex-col gap-4 ${className}`}
			>
				<div className="w-full flex flex-col gap-4">
					{renderHtml(agentMessage.message)}
				</div>
				{showSuggestions && (
					<div className="flex flex-wrap flex-col justify-start items-start gap-1">
						{agentMessage.suggestions?.map((suggestion, index) => (
							<Button
								key={index}
								variant="flat"
								className='bg-black text-white text-sm font-light h-7 rounded-full hover:bg-amber-500 hover:!opacity-100 transition duration-200'
								onPress={() => {
									if (onSuggestionSelected) {
										onSuggestionSelected(suggestion);
									}
								}}
							>
								{suggestion}
							</Button>
						))}
					</div>
				)}
				<div className="flex justify-start gap-1 text-xs text-gray-300">
					<div>AI Response Generated at</div>
					<div>{agentMessage.timestamp ? new Date(agentMessage.timestamp).toLocaleString() : 'unknown'}</div>
				</div>

				{(agentMessage.actions ?? []).filter((action) => action.action !== 'ui_open').length > 0 && (<>
					<div className="flex flex-wrap flex-col justify-start items-start gap-3 px-4 py-3 rounded-xl bg-white">
						{agentMessage.actions?.filter((action) => action.action !== 'ui_open').map((action:AgentAction, index:number) => (<div key={index} className='w-full'>
							{action.action === 'device_update' && (<>
								<div className="flex flex-col">
									<div className='flex flex-row gap-2 items-center'>
										<Icons.BoltIcon color='orange' />
										<span className='text-lg' style={{color: 'orange'}}>Device Updated</span>
									</div>
									<div className='pl-8 flex flex-row gap-2 items-center text-sm text-default-400'>
										<span>{getDeviceById(action.id)?.name}</span>
										<span>―</span>
										<span>{Object.entries(action.status ?? {}).map(([key, value], index) => (
											<span key={key}>{`${key} ${value}`}{index < Object.entries(action.status ?? {}).length - 1 ? ', ' : ''} </span>
										))}</span>
									</div>
								</div>
							</>)}
							{index < (agentMessage.actions ?? []).length - 1 && (<div className='w-[calc(100%-2rem)] h-[1px] ml-8 bg-gray-100 mt-1' />)}
						</div>))}
					</div>
					<div className="flex justify-start gap-1 text-xs text-gray-300">
						<div>AI Action Performed at</div>
						<div>{agentMessage.timestamp ? new Date(agentMessage.timestamp).toLocaleString() : 'unknown'}</div>
					</div>
				</>)}
			</motion.div>
		)}
	
		{agentMessage.userId != null && agentMessage.message !== 'HELLO' && (
			<div className='w-full flex flex-col justify-end items-end'>
				<motion.div
					initial="hidden"
					animate="visible"
					variants={fadeSlideUp}
					className={`mt-10 flex flex-col gap-1 bg-white rounded-xl shadow-lg shadow-default-200/50 px-3 py-2 ${className}`}
				>
					<div>{agentMessage.message}</div>
					<div className="flex justify-start gap-1 text-xs text-gray-300">
						<div>User Input at</div>
						<div>{agentMessage.timestamp ? new Date(agentMessage.timestamp).toLocaleString() : 'unknown'}</div>
					</div>
				</motion.div>
			</div>
		)}

	</>);
	
}
