import { Divider, Image } from '@nextui-org/react'
import NextImage from "next/image";

import React from 'react'
import ImgWithButton from '../imgWithButton/ImgWithButton';

export default function ImageGallery() {
    return (
        <div className='w-full'>
            <div>
                <div>
                    <div>

                        <h2 className='font-xl font-poppins text-wrap'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, molestias aliquid doloribus tempore rem magni asperiores deleniti a repudiandae voluptatem explicabo quisquam voluptatum quo ea amet excepturi accusamus, dolorem voluptas.</h2>
                    </div>
                    <div className='mt-1'>

                        <p className='font-light font-poppins text-sm text-wrap text-zinc-400'>Negative Prompt : Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt in inventore est reiciendis id illum ex cum harum tempore, amet porro quo debitis quibusdam sit hic consequuntur aspernatur minima a impedit nobis. Atque, iste error. Ratione sequi reprehenderit laborum voluptatibus, veniam minus vero inventore recusandae, amet quo pariatur, incidunt modi accusamus aperiam laboriosam consectetur quisquam eius nihil magni blanditiis non?</p>
                    </div>
                </div>
            </div>
            <Divider className='my-4' />
            <div className='w-full h-full flex flex-wrap justify-left items-center gap-8'>

                <ImgWithButton/>

                



            </div>
        </div>
    )
}
