"use client"

import { useRouter } from 'next/navigation'

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
// import { addToast } from '@heroui/react';
import AuthAPI from '@/api/auth';
import User from '@/types/user';

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  const reloadUserData = useCallback(async () => {
    setUserLoading(true);
    const fetchedUser = await AuthAPI.fetchUser();
    setUser(fetchedUser);
    setUserLoading(false);
    // eslint-disable-next-line
  }, [router]);

  useEffect(() => {
    reloadUserData();
  }, [router, user?.id, reloadUserData]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      userLoading,
      reloadUserData,
    }}>
      {children}
    </UserContext.Provider>
  );
};

const UserContext = createContext<{
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  userLoading: boolean;
  reloadUserData: () => Promise<void>;
} | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
