import { Divider, Spacer, Textarea } from '@nextui-org/react'
import React from 'react'

export default function PromptBox() {
    return (
        <div><Divider className='my-6' />

            <div className='w-full'>
                <div className='w-full'>
                    <Textarea
                        size='md'
                        isRequired
                        variant='bordered'
                        color='primary'
                        label="Positive Prompt"
                        labelPlacement="outside"
                        placeholder="Enter Positive Prompt"
                        className="w-full"
                    />
                </div>
                <Spacer y={4} />
                <div>
                    <Textarea
                        size='md'
                        isRequired
                        variant='bordered'
                        color='primary'
                        label="Negative Prompt"
                        labelPlacement="outside"
                        placeholder="Enter Negative Prompt"
                        className="w-full"
                    />
                </div>
            </div>
            <Divider className='my-6' /></div>
    )
}
