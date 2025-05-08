import { AgentChat } from "@/components/agent/agent-chat";
import { Sidebar } from "@/components/sidebar";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export const AppMainLayout = ({
  children
} : {
  children: ReactNode
}) => {
  const router = useRouter();
  return (<>
    <div className="min-h-dvh">
      <div className="flex flex-row mx-auto items-center h-dvh">
        <Sidebar />
        <div className={`mx-auto max-w-xs overflow-auto ${router.pathname === '/' ? 'w-0 opacity-0' : 'w-full px-6'} transition-all duration-300 ease-in-out`}>
          {children}
        </div>
        <AgentChat />
      </div>
    </div>
  </>);
};
