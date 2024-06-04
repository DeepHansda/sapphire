import React from 'react'

export default function SidebarTitle({ title }: {
    title: String
}) {
    return (
        <div>
            <h2 className='capitalize text-lg font-poppins font-bold'>
                {title}
            </h2>
        </div>
    )
}
