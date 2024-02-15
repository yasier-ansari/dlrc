import { cn } from "@/lib/utils"

const InfoPageFormSelect = ({ className, name, label, value, placeholder, errors, options, onChange, children }) => {
    return (
        <div className={cn(`flex w-full items-start justify-center space-y-2 flex-col ${className} `)}>
            <p className='bg-green-prim-1 rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                {label.charAt(0) + label.slice(1)}
            </p>
            {
                children
            }
            <select
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className='  font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 w-full bg-neutral-200  '
            >
                <option value='' disabled hidden>
                    Select {label.charAt(0) + label.slice(1)}
                </option>
                {options?.map((el) => (
                    <option value={el?.value} key={el?.value}>
                        {el?.value}
                    </option>
                ))}
            </select>
            <p className='text-red-400 text-start text-xs sm:text-sm md:text-base ml-2 font-normal '>
                {errors || '‎'}
            </p>
        </div>)
}

export default InfoPageFormSelect
