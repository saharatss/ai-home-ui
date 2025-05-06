'use client'

import {
  CircularProgress,
} from "@heroui/react";
import AuthAPI from "@/api/auth";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

export default function AuthLogout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await AuthAPI.logout();
      router.push('/auth/login')
      .then(() => {
        router.reload();
      });
    };
    logout();
  }, [router]);

  return (<>
    <div className="flex flex-col h-screen mx-auto items-center w-full">
      <div className="flex flex-col gap-4 justify-center items-center w-full h-full max-w-xs">
        <CircularProgress size='lg'/>
      </div>
    </div>
  </>);
}
