import { cn } from "@/lib/utils"
import React from 'react'

const InfoPageContainer = ({ children, className, heading, Icon, infoText, loading }) => {
    return (
        <>
            <div className={cn(`flex flex-col items-center justfiy-center max-w-4xl w-full h-full text-gray-800/90 mx-auto ${className} `)}>
                <div
                    div
                    className='flex items-center space-x-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl justify-center w-full h-full m-6 sm:m-8 md:m-12  text-center mx-auto'
                >
                    <Icon className=' text-[#40916c] -skew-x-6 ' />
                    <h1 className='font-bold  prompt '>{heading}</h1>
                </div>
            </div>
            <div
                className={`flex relative w-full items-center mx-auto flex-col space-y-2 sm:space-y-4 max-w-3xl ${loading && 'opacity-50'
                    } `}
            >
                <p className='mb-6 text-[0.8rem] sm:text-base md:text-lg text-gray-800/90 font-semibold '>
                    {infoText}
                </p>
                {
                    children
                }
                {/* <div className='w-full flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-4 md:space-y-0 md:space-x-6  '>
                    <div className='flex flex-col items-start justify-center space-y-2  w-full '>
                        <p className='bg-[#40916c] rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                            Name
                        </p>
                        <input
                            disabled={loading}
                            value={form?.fullname}
                            name='fullname'
                            type='text'
                            onChange={(e) =>
                                setForm({ ...form, fullname: e.target.value })
                            }
                            className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  '
                        />
                        <p className='text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold '>
                            {errors?.fullname || '‎'}
                        </p>
                    </div>
                </div>
                <div className='w-full flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-4 md:space-y-0 md:space-x-6  '>
                    <div className='flex items-start justify-center space-y-2 flex-col w-full '>
                        <p className='bg-[#40916c] rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                            Email
                        </p>
                        <input
                            disabled={loading}
                            type='email'
                            name='prn'
                            value={form?.domain_id}
                            onChange={(e) =>
                                setForm({ ...form, domain_id: e.target.value })
                            }
                            className='font-medium text-[0.8rem] sm:text-base md:text-lg outline-[#40916c] rounded-lg py-2 px-3 sm:px-4 md:px-6 w-full  bg-stone-200 '
                        />
                        <p className='text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold '>
                            {errors.domain_id || '‎'}
                        </p>
                    </div>
                </div>
                <div className='w-full flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-4 md:space-y-0 md:space-x-6  '>
                    <div className='flex  w-full sm:basis-[50%] items-start justify-center space-y-2 flex-col '>
                        <p className='bg-[#40916c] rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                            Prn
                        </p>
                        <input
                            disabled={loading}
                            type='text'
                            name='prn'
                            value={form?.prn}
                            pattern='[0-9]{6}'
                            maxLength={6}
                            onChange={(e) =>
                                setForm({ ...form, prn: e.target.value })
                            }
                            className='  font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 w-full bg-stone-200  '
                        />
                        <p className='text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold '>
                            {errors.prn || '‎'}
                        </p>
                    </div>
                    <div className='flex w-full sm:basis-[50%] items-start justify-center space-y-2 flex-col '>
                        <p className='bg-[#40916c] rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                            Dept
                        </p>
                        <select
                            name='department'
                            placeholder='department'
                            value={form?.department}
                            onChange={(e) =>
                                setForm({ ...form, department: e.target.value })
                            }
                            className='  font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 w-full bg-stone-200  '
                        >
                            <option value='' disabled hidden>
                                Select Department
                            </option>
                            {dept_options?.map((el) => (
                                <option value={el} key={el}>
                                    {el}
                                </option>
                            ))}
                        </select>
                        <p className='text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold '>
                            {errors.department || '‎'}
                        </p>
                    </div>
                </div>
                <div className='w-full flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-4 md:space-y-0 md:space-x-6  '>
                    <div className='flex w-full sm:basis-[50%] items-start justify-center space-y-2 flex-col '>
                        <p className='bg-[#40916c] rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                            Year
                        </p>
                        <select
                            name='year'
                            value={form?.year}
                            onChange={(e) =>
                                setForm({ ...form, year: e.target.value })
                            }
                            className='  font-medium text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 w-full bg-stone-200 '
                        >
                            <option value='' disabled hidden>
                                Select Year
                            </option>
                            {year_options?.map((el) => (
                                <option value={el} key={el}>
                                    {el}
                                </option>
                            ))}
                        </select>
                        <p className='text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold '>
                            {errors?.year || '‎'}
                        </p>
                    </div>
                    <div className='flex w-full sm:basis-[50%]  items-start justify-center space-y-2 flex-col '>
                        <p className='bg-[#40916c] rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                            Sem
                        </p>
                        <select
                            name='sem'
                            placeholder='sem'
                            value={form?.sem}
                            onChange={(e) =>
                                setForm({ ...form, sem: e.target.value })
                            }
                            className='  font-medium text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 w-full bg-stone-200 '
                        >
                            <option value='' disabled hidden>
                                Select Sem
                            </option>
                            {sem_options?.map((el) => (
                                <option value={el} key={el}>
                                    {el}
                                </option>
                            ))}
                        </select>
                        <p className='text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold '>
                            {errors?.sem || '‎'}
                        </p>
                    </div>
                </div>
                <div className='w-full flex flex-col md:flex-row items-center justify-between space-y-2 sm:space-y-4 md:space-y-0 md:space-x-6  '>
                    <div className='flex flex-col items-start justify-center space-y-2 w-full '>
                        <div className='flex items-start justify-start w-full h-full flex-col space-y-3 '>
                            <p className='bg-[#40916c] rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
                                Id Card (not Editable)
                            </p>
                            <div className='flex items-center opacity-70 justify-center group transition-all duration-300 ease-in-out  w-full h-full rounded-lg'>
                                <label
                                    htmlFor='image-input'
                                    className=' relative cursor-pointer'
                                >
                                    <img
                                        src={
                                            // selectedImage
                                            // 	? selectedImage
                                            // 	:
                                            `https://dlrc-public-demo.s3.ap-south-1.amazonaws.com//id-card/${user?.idCard}` ||
                                            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
                                        }
                                        alt='Please refresh the page if image is not visible'
                                        className='w-full h-full rounded-lg aspect-video min-h-full sm:rounded-xl md:rounded-2xl object-cover'
                                        width={80}
                                        height={80}
                                        loading='lazy'
                                    />
                                    {/* <div className='absolute top-0 right-0 bg-[#74c69d] rounded-lg sm:rounded-xl md:rounded-2xl p-1 sm:p-2 md:p-3 '>
										<LuInfo className='w-6 h-6 sm:h-8 sm:w-8 md:h-10 md:w-10' />
									</div> */}
                {/* <input
									disabled={loading}
									id='image-input'
									type='file'
									accept='image/*'
									className='hidden'
									onChange={handleImageChange}
								/> */}
            </div >
        </>
    )
}

export default InfoPageContainer