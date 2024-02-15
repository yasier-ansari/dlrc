import { cn } from "@/lib/utils"

const InfoPageFormInputPlaceholder = ({ className }) => {
    return (
        <div className={cn(`flex flex-col items-start justify-center space-y-2 w-full ${className} `)}>
            <p className='bg-[#40916c80] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white h-6 w-24 '></p>
            <p className='font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200  h-12 '></p>
        </div>
    )
}

export default InfoPageFormInputPlaceholder