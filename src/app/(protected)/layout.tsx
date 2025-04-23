'use client'

import { useFirebase } from '@/firebase/firebase.config';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect } from 'react'
import { FaSpinner } from 'react-icons/fa';


const layout = ({ children }: { children: ReactNode }) => {
  const { loggedInUser, authloading,isUserLoggedIn } = useFirebase();
  const router = useRouter();

  // TODO  : Still some glitch on this auth logic .. Need to fix it .. Not_loggedInUser can also visit protected route right now

  useEffect(() => {
    // console.log(isUserLoggedIn , authloading);
    
    if (!isUserLoggedIn && !authloading) {
      router.push("/sign-in");
    }
  }, [loggedInUser, authloading, router]);

  // if (authloading) {
  //   return <FaSpinner />; // Or <div>Loading...</div>
  // }

  return (
    <div >
      {children}
        
  </div>
  )
}

export default layout;