import React from 'react'
import InfoPageFormInput from "./InfoPageFormInput"
import InfoPageFormInputPlaceholder from "./InfoPageFormInputPlaceholder"
import { cn, formatDate } from "@/lib/utils"
import InfoOpacityContainer from "./InfoOpacityContainer"

const RequestContainer = ({ className, data, approved, loading, title, issued, rejected }) => {
    return (
        <>
            {
                loading ?
                    <div className='flex items-center justify-center flex-col w-full h-full mt-8 sm:mt-10 md:mt-12 p-4 sm:p-8 md:p-12 rounded-xl border-2  border-green-400/40 animate-pulse space-y-4 ' >
                        <div div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  ' >
                            {/* <div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full '>
                                <p className='bg-[#40916c80] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white h-6 w-24 '></p>
                                <p className='font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200  h-12 '></p>
                            </div> */}
                            <InfoPageFormInputPlaceholder className={'basis-[50%]'} />
                            {/* <div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full '>
                                <p className='bg-[#40916c80] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white h-6 w-24 '></p>
                                <p className='font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200  h-12 '></p>
                            </div> */}
                            <InfoPageFormInputPlaceholder className={'basis-[50%]'} />
                        </div>
                        <div className='w-full flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6  '>
                            <InfoPageFormInputPlaceholder className={'basis-[50%]'} />
                            <InfoPageFormInputPlaceholder className={'basis-[50%]'} />

                        </div>
                        <div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  '>
                            <InfoPageFormInputPlaceholder className={'basis-[50%]'} />
                            <InfoPageFormInputPlaceholder className={'basis-[50%]'} />
                        </div>
                    </div >
                    :
                    <InfoOpacityContainer
                        className={`${rejected && 'border-red-200/80 '} ${approved ? (issued ? 'border-green-300/80 ' : 'border-sky-300/80') : 'border-orange-200/80'} `}
                        innerClassName={`${rejected && 'from-red-400 to-red-500 '} ${approved ? issued ? 'from-[#52b788] to-green-prim-1 ' : 'from-sky-400 to-blue-500' : 'from-orange-400 to-orange-500'}`}
                        title={title}
                    >
                        <div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  '>
                            {/* <div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full '>
                                <p className='bg-green-prim-1 rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                                    Applied On
                                </p>
                                <p className='font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200  '>
                                    {formatDate(request?.request[0]?.createdAt)}
                                </p>
                            </div> */}
                            <InfoPageFormInput
                                name={'Applied On'}
                                disabled={true}
                                value={formatDate(data?.request[0]?.createdAt)}
                                type={'text'}
                                label={'Applied On'}
                                noError={true}
                            />
                            {/* <div className='flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full '>
                                <p className='bg-green-prim-1 rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                                    Duration
                                </p>
                                <p className='font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200  '>
                                    {request?.request[0]?.duration === 'Long'
                                        ? 'Half Yearly'
                                        : request?.request[0]?.duration ===
                                            'Medium'
                                            ? '1-2 Month'
                                            : '1 Month'}{' '}
                                </p>
                            </div> */}
                            <InfoPageFormInput
                                name={'Duration'}
                                disabled={true}
                                value={data?.request[0]?.duration === 'Long'
                                    ? 'Half Yearly '
                                    : data?.request[0]?.duration ===
                                        'Medium '
                                        ? '1-2 Month '
                                        : '1 Month '}
                                type={'text'}
                                label={'Duration'}
                                noError={true}
                            />
                        </div>
                        <div className='w-full flex flex-col md:flex-row items-center justify-between mt-4 md:mt-6  space-y-4 md:space-y-0 md:space-x-6 mx-auto  '>
                            {
                                approved ?
                                    < InfoPageFormInput
                                        name={'Approved On'}
                                        disabled={true}
                                        value={data?.request[0]?.createdAt !==
                                            data?.request[0]?.updatedAt
                                            ? formatDate(
                                                data?.request[0]?.updatedAt
                                            )
                                            : null}
                                        type={'text'}
                                        label={'Approved On'}
                                        noError={true}
                                    />
                                    :
                                    issued ?
                                        // <div className='flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full '>
                                        //     <p className='bg-green-prim-1 rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                                        //         Issued On
                                        //     </p>
                                        //     <p className='font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200  '>
                                        //         {request?.issue?.createdAt
                                        //             ? formatDate(request?.issue?.createdAt)
                                        //             : "Couldn't Fetch Date"}
                                        //     </p>
                                        // </div>
                                        < InfoPageFormInput
                                            name={'Issued On'}
                                            disabled={true}
                                            value={data?.issue?.createdAt
                                                ? formatDate(
                                                    data?.issue?.createdAt
                                                )
                                                : null}
                                            type={'text'}
                                            label={'Issued On'}
                                            noError={true}
                                        />
                                        :
                                        null
                            }
                            {
                                rejected ?
                                    <div className='w-full flex flex-col md:flex-row items-center justify-between mt-4 md:mt-6  space-y-4 md:space-y-0 md:space-x-6 mx-auto  '>
                                        <InfoPageFormInput
                                            name={'Rejected On'}
                                            disabled={true}
                                            value={data?.request[0]?.createdAt !==
                                                data?.request[0]?.updatedAt
                                                ? formatDate(
                                                    data?.request[0]?.updatedAt
                                                )
                                                : null}
                                            type={'text'}
                                            label={'Rejected On'}
                                            noError={true}
                                        />
                                    </div>
                                    : null
                            }
                        </div>
                    </InfoOpacityContainer>
            }

        </>
    )
}

export default RequestContainer