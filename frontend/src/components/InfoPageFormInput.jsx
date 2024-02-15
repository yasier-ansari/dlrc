import { cn } from "@/lib/utils"

const InfoPageFormInput = ({ className, name, disabled, value, type, errors, onChange, label, noError, children, pattern, maxLength, minLength }) => {
    const handleChange = (e) => {
        const inputValue = e.target.value;
        onChange && onChange(name, inputValue);
    };
    return (
        <div className={cn(`flex flex-col items-start justify-center space-y-2  w-full ${className} `)}>
            <label htmlFor={name} className='bg-green-prim-1 rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                {label.charAt(0).toUpperCase() + label.slice(1)}
            </label>
            {
                children
            }
            <input
                disabled={disabled}
                value={value}
                name={name}
                type={type}
                id={name}
                pattern={pattern}
                maxLength={maxLength}
                minLength={minLength}
                onChange={handleChange}
                className=' font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg p-2 sm:px-3 md:px-4 w-full bg-neutral-200 '
            />
            {
                !noError ?
                    <p className='text-red-400 text-start text-xs sm:text-sm md:text-base ml-2 font-normal'>
                        {errors || '‎'}
                    </p> : null
            }
        </div>)
}

export default InfoPageFormInput