import React from 'react'
import InfoListItems from "./InfoListItems"
import { cn } from "@/lib/utils"

const InfoList = ({ children, className }) => {
    return (
        <ul className={cn(`  text-sm sm:text-base md:text-lg lg:text-xl font-medium mt-4 mb-2 flex flex-col items-start gap-4 ${className} `)}>
            {children}
        </ul>
    )
}

export default InfoList