import React from 'react'

const AuthContainer = ({ children, action, actionText }) => {
    return (
        <div className=' flex flex-col relative max-w-[450px] items-center py-12 px-4 sm:px-6 md:px-12 flex-grow bg-white border-2 border-green-prim-1 shadow-green-900/50  rounded-lg space-y-8 xl:space-y-10 '>
            <div className='flex w-full flex-col '>
                <h2 className='text-2xl livvic md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center'>
                    {action}
                </h2>
                {
                    actionText ? <h6 className='text-sm md:text-base lg:text-lg mt-4 text-center'>
                        {actionText}
                    </h6> : null
                }

            </div>
            <div className='bg-green-800/20 w-[90%] sm:w-[85%] md:w-[80%] h-[2px] rounded-xl  '></div>
            {children}
        </div>)
}

export default AuthContainer