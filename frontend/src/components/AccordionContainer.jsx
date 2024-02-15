import Accordion from "./Accordion"
import { faqs } from "@/lib/utils"
import InfoContainer from "./InfoContainer"

const AccordionContainer = () => {
    return (
        <InfoContainer
            title="FAQ"
            className={'max-w-5xl '}
        >
            <div className='flex flex-col divide-y-[1.5px] divide-[#74c69d] rounded-xl mt-4 '>
                {faqs.map((d, i) => (
                    <Accordion
                        answer={d.answer}
                        title={d.question}
                        key={i}
                    />
                ))}
            </div>
        </InfoContainer>
    )
}

export default AccordionContainer