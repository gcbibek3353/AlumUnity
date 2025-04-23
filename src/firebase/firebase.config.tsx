"use client"
import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { saveUserAfterLogin } from "./user.controller";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  User,
  setPersistence,
  browserSessionPersistence

 } from "firebase/auth";
import { toast } from "sonner";

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
export const auth = getAuth(app);
export const firebasedb = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const FirebaseContext = createContext<FirebaseContextType | undefined>(
  undefined
);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context)
    throw new Error("useFirebase must be used within a FirebaseProvider");
  return context;
};

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [isUserLoggedIn,setIsUserLoggedIn]=useState(false)// TODO: Implement user authentication logic
  const[loggedInUser,setLoggedInUser]=useState<User|null>(null)
  const[authloading,setAuthloading]=useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user);
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
        setLoggedInUser(null);
      }
      setAuthloading(false);
    });
  
    return () => unsubscribe();
  }, []);
  const signUpWithEmail=async(email:string,password:string)=>{
    try{
      const result=await createUserWithEmailAndPassword(auth,email,password);
      toast.success(`Signed up as ${result.user.email}`);

    }
    catch(e:any){
      toast.error(e.message)
    }
  }
  const signInWithEmail=async(email:string,password:string)=>{
    try{
      const result=await signInWithEmailAndPassword(auth,email,password);
      toast.success(`Welcome back, ${result.user.email}`);

    }
    catch(e:any){
      toast.error(e.message);
    }
  }
  const signInWithGoogle=async()=>{
    try{
      const result=await signInWithPopup(auth,googleProvider );
      toast.success(`Welcome back, ${result.user.email}`);

    }
    catch(e:any){
      toast.error(e.message);
    }

  }
  const signInWithGithub=async()=>{

    try{
      const result=await signInWithPopup(auth,githubProvider)
      toast.success(`Welcome back, ${result.user.email}`);

    }
    catch(e:any){
      toast.error(e.message);
    }

  }
  const logOut=async()=>{
      try{
        await signOut(auth);
        toast.success("Logged out successfully");
      }
      catch(e:any){
        toast.error(e.message);
      }
  }

  

  return (
    <FirebaseContext.Provider value={{
       isUserLoggedIn,
       signInWithEmail,
       signUpWithEmail,
       signInWithGithub,
       signInWithGoogle,
       loggedInUser,
       logOut,
       authloading
     }}>
      {children}
    </FirebaseContext.Provider>
  )
}