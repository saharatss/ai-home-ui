'use client'

import {
  Input,
  Button,
  CircularProgress,
  Spinner,
} from "@heroui/react";
import AuthAPI from "@/api/auth";
import { useUser } from "@/context/user";
import { useRouter } from "next/router";
import React, { useState } from "react";

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

export default function AuthLogin() {
  const router = useRouter()
  const { userLoading, setUser } = useUser();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>, onEnter: () => void) {
    if (event.key === 'Enter') {
      onEnter();
    }
  }

  async function login() {
    setIsLoading(true);
    const response = await AuthAPI.login(username, password);
    if (response.success) {
      const user = await AuthAPI.fetchUser();
      if (user) {
        setUser(user);
      }
      navigateToNextPage();
      return;
    }else{
      // if (response.error === AuthError.USER_NOT_FOUND) {
      //   router
      //     .push('/auth/login')
      //     .then(() => {
      //       router.reload();
      //     });
      //   return;
      // }
      setErrorMessage(response.msg);
    }
    setIsLoading(false);
  }

  function navigateToNextPage() {
    router.push('/');
  }

  return (<>
    <div className="flex flex-col h-screen mx-auto items-center w-full">
      <div className="flex flex-col gap-3 justify-center items-center w-full h-full max-w-xs">
        { userLoading ? (
          <CircularProgress size='lg'/>
        ) : (<>
          {/* <div className="w-full text-2xl tracking-[.19em] px-3 pb-3 text-center mb-4">Agentic AI Home</div> */}
          <div className="w-full text-lg tracking-[.19em] px-3 pb-3 text-center mb-4">Smart AI Home Assistant</div>
          <Input
            size='md'
            variant="flat"
            label="Username"
            value={username}
            onValueChange={(value)=>{
              setUsername(value);
              setErrorMessage(null);
            }}
            onKeyDown={(e)=>{
              handleKeyPress(e, login);
            }}
            isInvalid={errorMessage != null}
            />
          <Input
            size='md'
            variant="flat"
            label="Password"
            type='password'
            value={password}
            onValueChange={(value)=>{
              setPassword(value);
              setErrorMessage(null);
            }}
            onKeyDown={(e)=>{
              handleKeyPress(e, login);
            }}
            errorMessage={errorMessage}
            isInvalid={errorMessage != null}
          />

          { isLoading ? (
            <Spinner variant='wave' className='h-16' />
          ) : (
            <Button
              className="w-full h-12 bg-white shadow-2xl text-lg mt-3"
              isDisabled={isLoading}
              isLoading={isLoading}
              onPress={()=>{ login() }}>
                Login
            </Button>
          )}
        </>)}
      </div>
    </div>
  </>);
}
