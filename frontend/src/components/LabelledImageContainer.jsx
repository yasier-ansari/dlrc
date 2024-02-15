import React, { useContext } from 'react'
import { DialogTrigger } from "./ui/dialog"
import { BsArrowsFullscreen } from "react-icons/bs"
import { AuthContext } from "@/context/AuthContext"

const LabelledImageContainer = ({ imageUrl, label }) => {
    const { setModalPopped, setDialogImage } = useContext(AuthContext)
    return (
        <DialogTrigger
            onClick={(e) => {
                setDialogImage(
                    imageUrl
                )
                setModalPopped(
                    imageUrl ||
                    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
                )
            }}
            className='flex flex-col items-start justify-center space-y-2 aspect-video w-full '
        >
            <p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                {label.charAt(0) + label.slice(1)}
            </p>
            <div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg border shadow-lg border-gray-300 shadow-gray-200 '>
                <button className='absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 '>
                    <BsArrowsFullscreen className='w-12 h-12 stroke-[1.5] ' />
                </button>
                <img
                    src={
                        imageUrl ||
                        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
                    }
                    className='w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg aspect-video  '
                    loading='lazy'
                    alt='Refresh if no image is visible'
                />
            </div>
        </DialogTrigger>)
}

export default LabelledImageContainer