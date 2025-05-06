'use client';
import parse, { DOMNode, domToReact } from 'html-react-parser';
import { AgentMessage } from '@/types/agent';
import type { Element } from 'domhandler';
import React from 'react';
import { Card } from '@heroui/react';

export default function AgentChatEntry({
  message,
}: {
  message: AgentMessage;
}) {
  const styledElements: Record<string, string> = {
    h1: "text-4xl font-light tracking-wide",
    h2: "text-lg font-medium",
    p: "text-base",
    strong: "font-medium",
    em: "italic",
    ul: "list-disc list-inside pl-4",
    ol: "list-decimal list-inside pl-4",
    li: "text-sm",
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
            <Card className='shadow-lg shadow-default-200 flex flex-col gap-3 p-4' shadow='none'>
              {domToReact(el.children as DOMNode[], parseOptions)}
            </Card>
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

  const renderHtml = (html: string) => parse(html, parseOptions);

  return message.userId === "AI" ? (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex flex-col gap-4">
        {renderHtml(message.message)}
      </div>
      <div className="flex justify-start gap-1 text-xs text-gray-300">
        <div>AI Generated at</div>
        <div>{message.timestamp ? new Date(message.timestamp).toLocaleString() : 'unknown'}</div>
      </div>
    </div>
  ) : (
    <div className="w-full flex flex-col gap-1 bg-white rounded-xl shadow-lg shadow-default-200/50 px-3 py-2">
      <div>{message.message}</div>
      <div className="flex justify-start gap-1 text-xs text-gray-300">
        <div>User Input at</div>
        <div>{message.timestamp ? new Date(message.timestamp).toLocaleString() : 'unknown'}</div>
      </div>
    </div>
  );
}
