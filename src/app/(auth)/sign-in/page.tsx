"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/AuthLayout';
import AuthButton from '@/components/AuthButton';
import { useFirebase } from '@/firebase/firebase.config';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignIn: React.FC = () => {
  const[email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const router=useRouter()
  const{signInWithGithub,signInWithGoogle,signInWithEmail,loggedInUser}=useFirebase();
  

  const handleGoogleSignUp=async(e:any)=>{
    await signInWithGoogle();
    router.push("/dashboard")
    

  }
  const handleGithubSignUp=async(e:any)=>{
    await signInWithGithub();
    router.push("/dashboard")
    

  }

  const handleSignIn=async(e:any)=>{
    try{
      const result=await signInWithEmail(email,password);
      

    }
    catch(e:any){
      toast.error(e.message);

    }
  }
  return (
    <AuthLayout title="Sign In">
      <p className="text-gray-600 mb-8">
        Welcome back to AlumUnity – where connections never fade.
      </p>
      
      <div className="space-y-4">
        <AuthButton provider="google" type="signin" onClick={handleGoogleSignUp}/>
        <AuthButton provider="github" type="signin" onClick={handleGithubSignUp}/>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">
              Or continue with email
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="your@email.com"
          />
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <a href="#" className="text-xs text-blue-600 hover:text-blue-800">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
          />
        </div>
        
        <button
          onClick={handleSignIn}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium transition-transform hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign In
        </button>
      </div>
      
      <p className="text-sm text-gray-600 text-center mt-8">
        Don't have an account?{' '}
        <Link href="/sign-up" className="text-blue-600 hover:text-blue-800 font-medium">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignIn;