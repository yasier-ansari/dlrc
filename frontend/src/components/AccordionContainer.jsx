import React from 'react'
import Accordion from "./Accordion"
import { faqs } from "@/lib/utils"

const AccordionContainer = () => {
    return (
        <div
            id='faq'
            className='flex scroll-mt-[130px] flex-col items-center justify-center mx-auto space-y-5 max-w-4xl mt-20'
        >
            <div className='flex w-full h-full items-center mb-4 md:mb-6'>
                <div className='w-full h-full bg-[#74c69d90] p-1 rounded-sm'>
                    ‎
                </div>
                <h3 className=' w-max font-bold text-[#2d6a4f] text-2xl md:text-3xl ml-3 rounded-md md:self-end '>
                    FAQs
                </h3>
            </div>
            <div className='flex flex-col divide-y-[1.5px] divide-[#74c69d] rounded-xl '>
                {faqs.map((d, i) => (
                    <Accordion
                        answer={d.answer}
                        title={d.question}
                        key={i}
                    />
                ))}
            </div>
        </div>
    )
}

export default AccordionContainer