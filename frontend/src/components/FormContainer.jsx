import React from 'react'

const FormContainer = ({ children, loading, onClick, buttonText, inverseUrl, inverseActionText, inverseAction }) => {
    return (
        <form
            className={`flex flex-col w-full mx-auto max-w-[400px] space-y-3 items-center ${loading && 'opacity-60'
                } `}
        >
            {
                children
            }
            <div className='text-base md:text-lg xl:text-xl md:p-2 font-normal w-full'>
                <button
                    type='submit'
                    onClick={onClick}
                    className='bg-gradient-to-tr from-[#40916c] to-[#74c69d] hover:scale-105 transition-all duration-200  px-3 py-2 md:px-6 lg:px-8 rounded-lg text-white shadow-lg font-semibold  w-full'
                >
                    {loading ? (
                        <div className='flex items-center space-x-3 justify-center rounded-lg'>
                            <p>Loading</p>
                            <div className='animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-[2.2px] border-r-none border-r-white border-transparent'></div>
                        </div>
                    ) : (
                        buttonText
                    )}
                </button>
            </div>
            <a
                href={inverseUrl}
                className='group hover:underline-offset-[5px] text-sm decoration hover:decoration-green-500 hover:underline hover:decora hover:decoration-2 font-normal hover:font-semibold cursor-pointer w-max sm:text-base md:text-lg -mt-2 flex justify-center items-center'
            >
                <span>{inverseActionText}</span>
                <span className=' text-green-700  '>‎ {inverseAction}</span>
            </a>
        </form>
    )
}

export default FormContainer