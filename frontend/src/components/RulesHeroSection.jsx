import React from 'react'
import { FaRegHandPointDown } from "react-icons/fa"
import InfoPageContainer from "./InfoPageContainer"

const RulesHeroSection = () => {
    return (
        <InfoPageContainer
            children, className, heading, Icon, infoText, loading={loading}
        >
            <div className='flex  flex-col  items-center justfiy-center w-full h-full'>
                <div
                    div
                    className='flex items-center space-x-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl justify-center w-full h-full pt-12 mb-8'
                >
                    <h1 className='font-bold  italic '>Rules</h1>
                    <FaRegHandPointDown className=' text-green-prim-1 ' />
                </div>
                <div>
                    <p className='text-[0.8rem] sm:text-sm md:text-base'>
                        To borrow a laptop, you're required to agree to the
                        University&apos;s policies relating to Security,
                        Acceptable Use and IT Asset Management.Students who do
                        not agree to these policies will not be issued with a
                        device. Please note the given rules and regulations
                    </p>
                </div>
            </div>
        </InfoPageContainer>
    )
}

export default RulesHeroSection