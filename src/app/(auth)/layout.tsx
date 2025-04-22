"use client"
import React, { ReactNode } from 'react'

const layout = ({children} : {children : ReactNode}) => {
    // TODO : logic to send back to dashboard if user is already logged in

  return (
    <div>{children}</div>
  )
}

export default layout