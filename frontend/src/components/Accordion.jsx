import React, { useState } from "react";
import NormalText from "./ui/normalText";

const Accordion = ({ title, answer }) => {
    const [accordionOpen, setAccordionOpen] = useState(false);

    return (
        <div className="pt-3">
            <button
                onClick={() => setAccordionOpen(!accordionOpen)}
                className="flex justify-start space-x-4 sm:space-x-6 md:space-x-8 w-full rounded-lg md:p-2 "
            >
                <svg
                    className="text-white fill-white shrink-0 w-8 h-8 p-2 rounded-full bg-[#52b788] shadow-sm shadow-gray-400"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center transition duration-200 ease-out ${accordionOpen && "!rotate-180"
                            }`}
                    />
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${accordionOpen && "!rotate-180"
                            }`}
                    />
                </svg>
                <span className="font-bold text-start text-base sm:text-lg md:text-xl lg:text-[1.3rem] " >{title}</span>
            </button>
            <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out mt-3 md:mt-2 text-slate-600 text-sm  ${accordionOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <NormalText className={'overflow-hidden font-[600] pl-12 md:pl-[70px]'} >
                    {answer}
                </NormalText>
            </div>
        </div>
    );
};

export default Accordion;