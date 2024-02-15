import React from 'react'
import NormalText from "./ui/normalText"
import { cn } from "@/lib/utils"

const InfoContainer = ({ title, children, className }) => {
    return (
        <div className={cn(`flex flex-col  w-full h-full py-8 ${className} `)}>
            <div className='flex w-full h-full items-center mb-6 '>
                <h3 className=' infoContainerHeading livvic '>
                    {title}
                </h3>
                <div className='w-full h-full bg-[#74c69d90] p-1 rounded-sm'>
                    ‎
                </div>
            </div>
            {
                children
            }
        </div>
    )
}


export default InfoContainer