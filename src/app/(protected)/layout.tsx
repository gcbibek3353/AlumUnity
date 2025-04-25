'use client'

import { SidebarNew } from '@/components/SideBarNew';
import { useFirebase } from '@/firebase/firebase.config';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';

const Layout = ({ children }: { children: ReactNode }) => {
  const { loggedInUser, authloading, isUserLoggedIn } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoggedIn && !authloading) {
      router.push('/sign-in');
    }
  }, [isUserLoggedIn, authloading, router]);

  // Optional loading UI
  // if (authloading) {
  //   return <div className="flex items-center justify-center h-screen"><FaSpinner className="animate-spin text-xl" /></div>;
  // }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar takes only its width */}
      <div className="shrink-0">
        <SidebarNew />
      </div>

      {/* Main content takes the rest */}
      <main className="flex-1 p-4 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default Layout;
