import { cn } from "@/lib/utils"

const InfoPageButtonContainer = ({ children, className }) => {
    return (
        <div className={cn(`w-full flex items-center text-white justify-between flex-col space-y-6 sm:space-y-8 md:space-y-0 md:flex-row pt-6 md:space-x-12 mx-auto max-w-2xl  ${className} `)} >
            {children}
        </div>
    )
}

export default InfoPageButtonContainer