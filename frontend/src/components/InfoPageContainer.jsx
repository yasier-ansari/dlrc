import { cn } from "@/lib/utils"
const InfoPageContainer = ({ children, className, heading, Icon, infoText, loading, innerClassName }) => {
    return (
        <>
            <div className={cn(`flex flex-col items-center justfiy-center w-full h-full text-gray-800/90 mx-auto ${className} `)}>
                <div
                    div
                    className='flex items-center space-x-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl justify-center w-full h-full mt-6 sm:mt-8 md:mt-12  text-center mx-auto  '
                >
                    <Icon className=' text-green-prim-1 -skew-x-6 ' />
                    <h1 className='font-bold  prompt '>{heading}</h1>
                </div>
            </div>
            <div
                className={cn(`flex relative w-full items-center mx-auto flex-col space-y-2 sm:space-y-4  ${loading ? 'opacity-50' : ' '} ${innerClassName} `)}
            >
                <p className='text-[0.8rem] sm:text-base md:text-lg text-gray-800/90 font-semibold mb-6 sm:mb-8 md:mb-12 '>
                    {infoText}
                </p>
                {
                    children
                }
            </div >
        </>
    )
}

export default InfoPageContainer