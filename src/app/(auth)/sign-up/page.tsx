"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/AuthLayout';
import AuthButton from '@/components/AuthButton';
import { useFirebase } from '@/firebase/firebase.config';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SignUp: React.FC = () => {
  const { signUpWithEmail, signInWithGoogle, signInWithGithub } = useFirebase();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    if (!agreedToTerms) {
      toast.error("You must agree to the Terms and Privacy Policy");
      return;
    }

    setLoading(true);
    try {
      await signUpWithEmail(email, password);
      router.push("/dashboard");
    } catch (e: any) {
      toast.error(e.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    
      await signInWithGoogle();
      router.push("/dashboard");
    
  };

  const handleGithubSignUp = async () => {
    
      await signInWithGithub();
      router.push("/dashboard")
     
  };

  return (
    <AuthLayout title="Create Account">
      <p className="text-gray-600 mb-6">
        Join a growing network of learners, leaders, and legacy makers.
      </p>

      <form onSubmit={handleSignUp} className="space-y-3">
        <AuthButton provider="google" type="signup" onClick={handleGoogleSignUp} />
        <AuthButton provider="github" type="signup" onClick={handleGithubSignUp} />

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-sm text-gray-500">
              Or continue with email
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="your@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="••••••••"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Must be at least 8 characters long with a number and a symbol.
          </p>
        </div>

        <div className="flex items-start">
          <input
            id="terms"
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
            I agree to the{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-indigo-600 text-white py-2 rounded-lg transition-all ${
            loading ? "opacity-70 cursor-not-allowed" : "hover:bg-indigo-700"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
                ></path>
              </svg>
              Signing up...
            </div>
          ) : (
            "Sign up"
          )}
        </button>
      </form>

      <p className="text-sm text-gray-600 text-center mt-4">
        Already have an account?{' '}
        <Link href="/sign-in" className="text-blue-600 hover:text-blue-800 font-medium">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignUp;
