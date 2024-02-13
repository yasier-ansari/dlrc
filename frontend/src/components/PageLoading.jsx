import React from 'react'

const PageLoading = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-500 z-50'>
            <div className='flex items-center space-x-3 bg-white px-3 py-2 rounded-lg'>
                <h2 className='text-lg font-semibold'>Loading</h2>
                <div className='animate-spin rounded-full h-4 w-4 border-[2.2px] border-r-none border-r-white border-[#40916c]'></div>
            </div>
        </div>
    )
}

export default PageLoading