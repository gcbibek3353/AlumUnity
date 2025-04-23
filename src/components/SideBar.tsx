"use client"
import { useFirebase } from '@/firebase/firebase.config'
import Link from 'next/link';
import React from 'react'

// TODO : This is just a temporary sidebar || update it later with a proper styling and design

const SideBar = () => {
    const {loggedInUser} = useFirebase();
    // console.log(loggedInUser);

  return (
    <div>
        <div>
            <Link href="/dashboard">Dashboard</Link> <br />
            <Link href="/events">events</Link> <br />
            <Link href="/forums">forums</Link> <br />
            <Link href="/oppertunities">oppertunities</Link> <br />
            <Link href="/profile">profile </Link> <br />
        </div>
    </div>
  )
}

export default SideBar