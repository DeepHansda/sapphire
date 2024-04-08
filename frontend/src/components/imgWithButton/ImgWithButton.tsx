"use client"
import { Button, Image, useDisclosure } from '@nextui-org/react'
import React, { useState } from 'react'
import { BiDownArrowCircle } from 'react-icons/bi'
import { LiaInfoCircleSolid } from 'react-icons/lia'
import ImgModal from './ImgModal'


const dummyData = {
    prompt: "Generate a beautiful landscape with a stunning sunset and mountains in the background, Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi excepturi consequuntur minima quaerat non atque quidem dolores rem facere perspiciatis, explicabo omnis neque quo eaque dolore exercitationem quibusdam facilis harum?",
    negative_prompt: "Create a dystopian world filled with dark skies, polluted air, and barren lands.Generate a beautiful landscape with a stunning sunset and mountains in the background, Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi excepturi consequuntur minima quaerat non atque quidem dolores rem facere perspiciatis, explicabo omnis neque quo eaque dolore exercitationem quibusdam facilis harum?",
    width: 800,
    height: 600,
    scheduler: "random",
    steps: 1000,
    use_kerras: true,
    seed: 12345,
    guidance_scale: 0.8
}

export default function ImgWithButton() {
    const { isOpen, onOpenChange, onOpen } = useDisclosure()
    return (
        <div>

            <ImgModal isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen} imgData={dummyData} />

            <div className='relative'>
                <div className='z-0'>
                    <Image
                        src='/anime_girl.jpg'
                        alt='girl'
                        width={512}
                        height={512}
                        // fill={true}
                        isBlurred
                        radius='sm'
                    />
                </div>
                <div className='absolute z-10 top-0 [&_button]: bg-transparent'>
                    <Button isIconOnly className='bg-transparent'>
                        <BiDownArrowCircle size={20} />
                    </Button>
                    <Button isIconOnly onPress={onOpen}>
                        <LiaInfoCircleSolid size={20} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
