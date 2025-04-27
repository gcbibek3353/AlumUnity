"use client"

import { Cta } from "@/components/CTA";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";

import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";

// import { useFirebase } from "@/firebase/firebase.config";


export default function Home() {
  // const {isUserLoggedIn} = useFirebase();
  return (
  <div>
    <Navbar/>
    <Hero/>
    <Features/>
    <HowItWorks/>
    <Cta/>
    <Footer/>
     {/* {isUserLoggedIn ? "Logged In" : "Logged Out"} */}
  </div>
  );
}
