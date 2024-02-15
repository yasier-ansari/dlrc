import { cn } from "@/lib/utils"
import React, { useState } from 'react'
import { LuEye, LuEyeOff } from "react-icons/lu"

const InputItem = ({ className, errors, name, disabled, type, required, pattern, max, min, onChange, value, placeholder }) => {
    const [passVisible, setPassVisible] = useState(false)
    return (
        <div className={cn(` text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full relative ${className} `)}>
            {
                type === 'password' ?
                    <>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setPassVisible(!passVisible)
                            }}
                            className='absolute top-[10px] right-3 transition-all duration-300 ease-out'
                        >
                            {/* {!passVisible ? ( */}
                            <LuEyeOff
                                className={`text-green-prim-1 transition-all duration-300 ease-out ${!passVisible ? 'opacity-100' : 'opacity-0'
                                    } `}
                            />

                            {/* )} */}
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault()
                                setPassVisible(!passVisible)
                            }}
                            className='absolute top-[10px] right-3 transition-all duration-300 ease-out'
                        >
                            {/* {!passVisible ? ( */}
                            <LuEye
                                className={`text-green-prim-1 transition-all duration-300 ease-out ${passVisible ? 'opacity-100' : 'opacity-0'
                                    } `}
                            />

                            {/* )} */}
                        </button>
                    </> : null
            }
            <input
                disabled={disabled}
                type={type !== 'password' ? type : passVisible ? 'text' : 'password'}
                name={name}
                required={required}
                placeholder={placeholder || undefined}
                value={value}
                pattern={pattern || undefined}
                // onChange={onChange}
                onChange={(e) => onChange(name, e.target.value)}
                autoComplete="true"
                max={max || undefined}
                min={min || undefined}
                className={`  ${errors && 'border-[2px] border-red-400 '
                    } w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-neutral-200 focus:outline-green-prim-1 focus:outline-2 placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3`}
            />
            <p className='text-red-400 text-start ml-2 font-normal text-xs sm:text-sm md:text-base  '>
                {errors || '‎'}
            </p>
        </div>
    )
}

export default InputItem