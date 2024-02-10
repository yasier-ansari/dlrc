import { cn } from "@/lib/utils"
import React from 'react'

const NormalText = ({ children, className }) => {
    return (
        <p className={cn(` genericParaText ${className} `)}>
            {children}
        </p>
    )
}

export default NormalText