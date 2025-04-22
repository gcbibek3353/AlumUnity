"use client"
import { FirebaseProvider } from '@/firebase/firebase.config'
import React, { ReactNode } from 'react'

const Provider = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <FirebaseProvider>
            {children}
            </FirebaseProvider>

        </div>
    )
}

export default Provider