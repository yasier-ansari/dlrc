import React from 'react'
import { LuFolderEdit } from "react-icons/lu"

const ImageInput = ({ name, className, label, value, disabled, id, onChange, errors }) => {
    return (
        <div className='flex flex-col items-start justify-center w-full  h-full space-y-3 '>
            <div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full rounded-lg'>
                <label
                    htmlFor={id}
                    className=' relative cursor-pointer'
                >
                    <p className=' text-xs md:text-sm font-medium rounded-md sm:rounded-lg bg-green-prim-1 p-1 w-max  px-2 text-white mb-2  md:rounded-lg  py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start  '>
                        {label}
                    </p>
                    <img
                        src={
                            value
                                ? value
                                : 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
                        }
                        alt='Selected Image'
                        className='w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl object-contain aspect-video '
                        width={100}
                        height={100}
                        loading='lazy'
                    />
                    <div className='absolute top-7 md:top-10 right-0 bg-[#74c69d] rounded-lg sm:rounded-xl md:rounded-2xl p-2 md:p-3 '>
                        <LuFolderEdit className='w-5 h-5 sm:h-6 sm:w-6 md:h-7 md:w-7' />
                    </div>
                </label>
                <input
                    disabled={disabled}
                    id={id}
                    type='file'
                    accept='image/*'
                    className='hidden'
                    name={name}
                    onChange={onChange}
                />
            </div>
            <p className='text-red-400 text-start text-xs sm:text-sm md:text-base ml-2 font-normal '>
                {errors || '‎'}
            </p>
        </div>
    )
}

export default ImageInput