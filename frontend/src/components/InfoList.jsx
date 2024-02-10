import React from 'react'
import InfoListItems from "./InfoListItems"
import { cn } from "@/lib/utils"

const InfoList = ({ children, className }) => {
    return (
        <ol className={cn(`flex flex-col items-start gap-4 text-[0.8rem] sm:text-sm md:text-base ${className} `)}>
            {children}
        </ol>
    )
}

export default InfoList