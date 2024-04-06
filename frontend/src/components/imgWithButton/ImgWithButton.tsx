import { Button, Image } from '@nextui-org/react'
import React from 'react'
import { BiDownArrowCircle } from 'react-icons/bi'
import { LiaInfoCircleSolid } from 'react-icons/lia'


export default function ImgWithButton() {
    return (
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
                <Button isIconOnly>
                <LiaInfoCircleSolid size={20}/>
                </Button>
            </div>
        </div>
    )
}
