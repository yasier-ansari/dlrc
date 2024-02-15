import { cn } from "@/lib/utils"
import React from 'react'

const LoadingButton = ({ className, type, onClick, buttonText, disabled, loading }) => {
    return (
        <button
            type={type || undefined}
            disabled={disabled}
            onClick={onClick}
            className={cn(` bg-gradient-to-t from-green-prim-1 to-[#74c69d] hover:scale-105 transition-all duration-200  px-3 py-2 md:px-6 lg:px-8 md:py-3 rounded-lg text-white shadow-lg font-semibold md:text-lg xl:text-xl w-full ${className} mx-auto `)}
        >
            {loading ? (
                <div className='flex items-center space-x-3 justify-center rounded-lg'>
                    <p>Loading</p>
                    <div className='animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-[2.2px] border-r-none border-r-white border-transparent'></div>
                </div>
            ) : (
                buttonText
            )}
        </button>)
}

export default LoadingButton