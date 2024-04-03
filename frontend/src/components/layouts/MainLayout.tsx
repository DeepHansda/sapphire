"use client"
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import Sidebar from '../sidebar/Sidebar'


export default function MainLayout({children}:{
    children:React.ReactNode
}) {
  return (
    <NextUIProvider>
        <div>
            <Sidebar/>
            {children}
        </div>
    </NextUIProvider>
  )
}
