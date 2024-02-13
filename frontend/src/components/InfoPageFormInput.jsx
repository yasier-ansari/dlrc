import { cn } from "@/lib/utils"

const InfoPageFormInput = ({ className, name, disabled, value, type, errors, onChange, label, noError }) => {
    return (
        <div className={cn(`flex flex-col items-start justify-center space-y-2  w-full ${className} `)}>
            <p className='bg-[#40916c] rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                {label.charAt(0).toUpperCase() + label.slice(1)}
            </p>
            <input
                disabled={disabled}
                value={value}
                name={name}
                type={type}
                onChange={(e) => onChange(name, e.target.value)}
                className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  '
            />
            {
                !noError ?
                    <p className='text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold '>
                        {errors || '‎'}
                    </p> : null
            }
        </div>)
}

export default InfoPageFormInput