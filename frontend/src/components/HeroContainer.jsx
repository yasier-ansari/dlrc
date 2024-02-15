import React from 'react'
import ParagraphText from "./ui/paragraphText"

const HeroContainer = () => {
    return (
        <div className='flex flex-col items-center space-y-6 sm:space-y-6 justify-center md:justify-between md:flex-row w-full h-full min-h-[85vh]'>
            <div className='w-full h-full md:basis-1/2 select-none '>
                <img
                    src='./hero-image-cropped.png'
                    className='w-full h-full object-contain md:-translate-x-10 -rotate-12 transform -skew-x-12  skew-y-6s '
                />
            </div>
            <div className='w-full h-full md:basis-[55%] lg:basis-[60%] flex flex-col gap-3 items-start justify-center'>
                <div className='flex flex-col items-start justfy-center'>
                    <div className='heroSubText  '>
                        M.H. Saboo Siddik's
                    </div>
                    <div className=' heroHeading livvic '>
                        Digital Learning Resource Center
                    </div>
                </div>
                <ParagraphText>
                    Apply for the scholarship and avail a laptop for a
                    definite period of time for your college studies
                </ParagraphText>
                <div className='flex items-center justify-start space-x-12 w-full '>
                    <a
                        href='/user/apply'
                        className='text-base sm:text-lg md:text-xl p-2 md:px-8 md:py-3 lg:px-10 border-2 border-white hover:border-green-500 hover:border-2  duration-500 ease-linear  inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-green-400 bg-gradient-to-tr from-[#52b788] to-green-prim-1 hover:bg-gradient-to-br hover:from-[#74c69d] hover:to-green-prim-1 px-5 py-2 rounded-lg md:rounded-xl text-white '
                    >
                        Apply
                    </a>
                    <a
                        href='/'
                        className='text-base sm:text-lg md:text-xl p-2 md:px-8 md:py-3 lg:px-10 border-2 border-white hover:border-stone-400 hover:border-2  duration-500 ease-linear  inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  hover:bg-gradient-to-br  focus-visible:ring-stone-400 bg-gradient-to-tr from-gray-200 to-slate-100 hover:from-zinc-300 hover:to-slate-200 px-5 py-2 rounded-lg md:rounded-xl text-gray-800   '
                    >
                        Rules
                    </a>
                </div>
            </div>
        </div>
    )
}

export default HeroContainer