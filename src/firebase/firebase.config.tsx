"use client"
import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

interface FirebaseContextType {
  // TODO : Testing for now, Update later
  isUserLoggedIn: boolean;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);
FirebaseContext.displayName = 'FirebaseContext';

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context)
    throw new Error("useFirebase must be used within a FirebaseProvider");
  return context;
};

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const isUserLoggedIn = false; // TODO: Implement user authentication logic

  return (
    <FirebaseContext.Provider value={{ isUserLoggedIn }}>
      {children}
    </FirebaseContext.Provider>
  )
}