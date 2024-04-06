import { Button, Chip, Divider, Input, ScrollShadow, Select, SelectItem, Slider, Switch } from '@nextui-org/react'
import React from 'react'
import SidebarTitle from './components/SidebarTitle'

const num_of_imgs_list = [1, 2, 3, 4, 5, 6, 7, 8]
const schedulers = [
    "eular",
    "eular_a",
    "heun",
    "lms",
    "unipc",
    "dpm_2",
    "dpm_2_a",
    "dpmpp_2m",
    "dpmpp_sde",
    "dpmpp_2m_sde"
]

export default function Sidebar() {
    return (
        <div className='w-auto h-screen '>
            <ScrollShadow size={80} offset={10} orientation='vertical' className='w-[300px] max-h-screen scrollbar-thin  p-6'>
                <div className=' '>
                    <div>
                        <div className='flex flex-col gap-y-6'>
                            <SidebarTitle title="image dimentions" />
                            <div className='flex flex-col gap-y-2'>
                                <Slider
                                    size="sm"
                                    color="primary"
                                    label="Width"
                                    maxValue={2048}
                                    minValue={256}
                                    defaultValue={512}
                                    className="max-w-sm"
                                />
                                <Input variant='bordered' size='sm' type='number' placeholder='width' color='primary' />
                            </div>

                            <div className='flex flex-col gap-y-2'>
                                <Slider
                                    size="sm"
                                    color="primary"
                                    label="Height"
                                    maxValue={2048}
                                    minValue={256}
                                    defaultValue={512}
                                    className="max-w-sm"
                                />
                                <Input variant='bordered' size='sm' type='number' placeholder='height' color='primary' />

                            </div>
                        </div>


                        <Divider className='my-6' />
                        <div className='flex flex-col gap-y-6'>

                            <SidebarTitle title="number of images" />
                            <div>
                                <div className='flex flex-wrap gap-4'>
                                    {num_of_imgs_list.map((num, index) => (
                                        <Button color='primary' size='sm' variant='ghost' key={index}>{num}</Button>
                                    )
                                    )}
                                </div>
                            </div>
                        </div>

                        <Divider className='my-6' />
                        <div className='flex flex-col gap-y-6'>

                            <SidebarTitle title="Guidance Scale" />
                            <div className='flex flex-col gap-y-2'>
                                <Slider
                                    size="sm"
                                    color="primary"
                                    label="Guidance Scale"
                                    maxValue={30}
                                    minValue={0}
                                    step={0.01}
                                    defaultValue={7.5}
                                    className="max-w-sm"
                                />
                                <Input variant='bordered' step={0.01} size='sm' type="number" placeholder='Guidance Scale' color='primary' />
                            </div>
                        </div>

                        <Divider className='my-6' />
                        <div className='flex flex-col gap-y-6'>
                            <SidebarTitle title="schedulers" />
                            <div className='font-poppins'>
                                <Select size='sm' label="Select Scheduler" variant='bordered' color='primary'>
                                    {
                                        schedulers.map((scheduler, index) => (

                                            <SelectItem title={scheduler} value={scheduler} key={index} />
                                        ))
                                    }
                                </Select>
                                <Switch defaultSelected size="sm" className='mt-4'>Use Kerras</Switch>
                            </div>
                        </div>
                        <Divider className='my-6' />
                        <div className='flex flex-col gap-y-6'>
                            <SidebarTitle title="seed" />
                            <div className='font-poppins'>
                                <Input variant='bordered' size='sm' type='number' placeholder='Seed' color='primary' />
                                <Switch defaultSelected size="sm" className='mt-4'>Fixed Seed</Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollShadow>
        </div>
    )
}
