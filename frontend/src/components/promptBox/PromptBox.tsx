import { Button, Divider, Spacer, Textarea } from '@nextui-org/react'
import { BiCog } from "react-icons/bi";
import React, { useContext } from 'react'
import { AppContext } from '@/lib/AppContext';

export default function PromptBox() {
    const {formDataState,handleFormState} = useContext(AppContext)
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
                        value={formDataState.prompt}
                        onChange={(e) => handleFormState({prompt:e.target.value})}
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
                        value={formDataState.negative_prompt}
                        onChange={(e) => handleFormState({negative_prompt:e.target.value})}
                    />
                </div>
                <Spacer y={4} />
                <div>
                    <Button color='primary' className='capitalize text-black font-bold' >
                        <div className='animate-spin'>
                            <BiCog size={20}/>
                        </div>
                        generate
                    </Button>
                </div>
            </div>
            <Divider className='my-6' /></div>
    )
}
