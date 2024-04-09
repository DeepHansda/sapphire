"use client"
import { NextUIProvider, ScrollShadow } from '@nextui-org/react'
import React, { ChangeEvent, createContext, useState } from 'react'
import Navbar from '../navbar/Navbar'
import PromptBox from '../promptBox/PromptBox'
import Sidebar from '../sidebar/Sidebar'
import { Text2Img } from '@/lib/types'
import { AppContext, defaultFormData } from '@/lib/AppContext'

export default function MainLayout({ children }: {
  children: React.ReactNode
}) {
  const [formDataState, setFormDataState] = useState(defaultFormData)
  const handleFormState = (v: any): void => {
    // console.log(v)
    setFormDataState((prevValues) => ({ ...prevValues, ...v }))
  }
  return (
    <NextUIProvider>
      <AppContext.Provider value={{ formDataState, handleFormState }}>
        <div className="flex" >
          <Sidebar />
          <ScrollShadow size={60} offset={40} className='scrollbar-thin scrollbar-thumb-rounded-[100%] w-full max-h-screen p-6 relative'>
            <div className='fixed'>

              <Navbar />
            </div>
            <div className='mt-32'>


              <PromptBox />
              <div>
                {children}
              </div>

            </div>
          </ScrollShadow>
        </div>
      </AppContext.Provider>
    </NextUIProvider>
  )
}
