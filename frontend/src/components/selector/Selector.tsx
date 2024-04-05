import { Select, SelectItem } from '@nextui-org/react'
import React from 'react'

export default function Selector({label,data,variant}:{
    label:string,
    data:any[],
    variant:string,
}) {
    return (
        <div className='font-poppins w-full'>
            <Select size='sm' label={label} variant={variant} color='primary'>
                {
                    data.map((d, index) => (
                        <SelectItem title={d} value={d} key={index} />
                    ))
                }
            </Select>
        </div>

    )
}
