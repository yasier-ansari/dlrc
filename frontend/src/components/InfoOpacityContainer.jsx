import { cn } from "@/lib/utils"

const InfoOpacityContainer = ({ children, className, innerClassName, title }) => {
    return (
        <div className={cn(`flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl border-2 mt-8  relative  ${className} `)}>
            <div
                className='absolute inset-0 left-[50%] translate-x-[-50%] w-full -top-3 sm:-top-4 md:-top-5  z-10'
            >
                <div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-max mx-auto '>
                    <p className={cn(` w-full py-1 px-3 sm:py-2 sm:px-4 md:px-6 bg-gradient-to-tr text-xs sm:text-sm md:text-base font-semibold   text-white rounded-sm sm:rounded-lg md:rounded-xl mx-auto  ${innerClassName} `)}>
                        {title}
                    </p>
                </div>
            </div>
            {
                children
            }
        </div>)
}

export default InfoOpacityContainer