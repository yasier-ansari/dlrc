import { cn } from "@/lib/utils"

const InfoPageFormContainer = ({ children, className }) => {
    return (
        <div className={cn(` my-2 w-full flex flex-col md:flex-row items-center justify-between space-y-2 sm:space-y-4 md:space-y-0 md:space-x-6  ${className} `)}>
            {children}
        </div>
    )
}

export default InfoPageFormContainer