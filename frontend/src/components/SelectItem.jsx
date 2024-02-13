import { cn } from "@/lib/utils"
import React from 'react'

const SelectItem = ({ name, placeholder, value, onChange, errors, required, className, options }) => {
    return (
        <div className={cn(`text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full ${className} `)}>
            <select
                name={name}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                className={` ${errors &&
                    'border-[1.5px] border-red-500 '
                    } w-full caret-green-600 lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-200  focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3`}
            >
                <option value='' disabled hidden>
                    Select {name.charAt(0).toUpperCase() + name.slice(1)}
                </option>
                {options?.map((el) => (
                    <option value={el} key={el}>
                        {el}
                    </option>
                ))}
            </select>
            <p className='text-red-400 text-start text-sm ml-2 font-normal '>
                {errors || '‎'}
            </p>
        </div>)
}

export default SelectItem