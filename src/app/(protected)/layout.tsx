'use client';

import { useFirebase } from '@/firebase/firebase.config';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';

const Layout = ({ children }: { children: ReactNode }) => {
  const { loggedInUser, authloading, isUserLoggedIn } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoggedIn && !authloading) {
      router.push("/sign-in");
    }
  }, [isUserLoggedIn, authloading, router]);

  if (authloading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-500" />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default Layout;
