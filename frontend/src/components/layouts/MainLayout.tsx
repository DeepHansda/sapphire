"use client"
import { NextUIProvider, ScrollShadow } from '@nextui-org/react'
import React from 'react'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import PromptBox from '../promptBox/PromptBox'


export default function MainLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <NextUIProvider>
      <div className="flex" >
        <Sidebar />
        <ScrollShadow size={60}  offset={40} className='w-full max-h-screen p-6 relative'>
          <div className='fixed'>

          <Navbar />
          </div>
          <div className='mt-32 h-[2000px]'>
            <div className=''>

          <PromptBox/>
          {children}
            </div>
          </div>
        </ScrollShadow>
      </div>
    </NextUIProvider>
  )
}
