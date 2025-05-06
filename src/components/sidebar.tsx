"use client";

import { useUser } from "@/context/user";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const SidebarDivider = () => {
  return (
    <div className="flex flex-col w-full px-3 py-2">
      <div className="w-full h-[1px] bg-default-200" />
    </div>
  );
}

const SidebarMenuItem = ({
  isSelected = false,
  children,
  onPress,
}: {
  isSelected?: boolean;
  children: React.ReactNode;
  onPress?: () => void;
}) => {
  return (
    <div
      className={`w-full flex items-center gap-2 hover:bg-default-200 rounded-lg p-2 px-3 cursor-pointer transition-colors duration-100 ${isSelected ? 'bg-black text-white hover:bg-default-800' : ''}`}
      onClick={onPress}
    >
      {children}
    </div>
  );
}

export const Sidebar = () => {
  const router = useRouter();

  const { userLoading, user } = useUser();
  
  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/auth/login');
    }
    // eslint-disable-next-line
  }, [userLoading, user]);

  const currentPage = router.pathname.split("/").slice(-1)[0];

  return (
    <div className="flex flex-col h-full w-64 min-w-64 items-center gap-2 px-6 justify-between z-50 py-10">
      <div className="flex flex-col w-full gap-2">
        <div className="w-full text-lg tracking-[.19em] px-3 pb-3">Agentic AI Home</div>
        <SidebarDivider />
        <div className="w-full text-sm tracking-widest text-default-400 px-3">{userLoading ? "Loading..." : `Welcome, ${user?.firstName} ${user?.lastName}`}</div>
      </div>

      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-col w-full">
          <SidebarMenuItem isSelected={currentPage === ""}        onPress={()=>{ router.push('/'); }}>Agent</SidebarMenuItem>
          <SidebarMenuItem isSelected={currentPage === "devices"} onPress={()=>{ router.push('/devices'); }}>Devices</SidebarMenuItem>
          <SidebarMenuItem isSelected={currentPage === "energy"}  onPress={()=>{ router.push('/energy'); }}>Energy</SidebarMenuItem>
        </div>
        {/* <SidebarDivider />
        <div className="flex flex-col w-full">
          <SidebarMenuItem>Default Room</SidebarMenuItem>
        </div> */}
      </div>

      <div className="flex flex-col w-full gap-2">
        <SidebarDivider />
        <div className="flex flex-col w-full">
          {/* <SidebarSectionHeader>User</SidebarSectionHeader> */}
          <SidebarMenuItem onPress={()=>{ router.push('/auth/logout'); }}>Logout</SidebarMenuItem>
        </div>
        <SidebarDivider />
        <div className="flex flex-col w-full px-3">
          <div className="text-xs text-default-400">Developed by</div>
          <div className="text-xs text-default-400 mt-2">
            <div>Saharat Saengsawang</div>
            <div>Puja Kumari</div>
            <div>Akanksha Pingle</div>
          </div>
        </div>
      </div>

    </div>
  );
};
