import { cn } from "@/lib/utils"

const InfoPageFormSelect = ({ className, name, label, value, placeholder, errors, options, onChange }) => {
    return (
        <div className={cn(`flex w-full items-start justify-center space-y-2 flex-col ${className} `)}>
            <p className='bg-[#40916c] rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                {label.charAt(0) + label.slice(1)}
            </p>
            <select
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(name, e.target.value)}
                className='  font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 w-full bg-stone-200  '
            >
                <option value='' disabled hidden>
                    Select {label.charAt(0) + label.slice(1)}
                </option>
                {options?.map((el) => (
                    <option value={el} key={el}>
                        {el}
                    </option>
                ))}
            </select>
            <p className='text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold '>
                {errors || '‎'}
            </p>
        </div>)
}

export default InfoPageFormSelect