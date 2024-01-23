import React, { useContext, useEffect } from 'react'
// import { ListContext } from "../context/ListContext"
// import Paginator from "./Paginator";
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { HiOutlineDocumentText } from 'react-icons/hi2'
import { LuUserCircle2 } from 'react-icons/lu'
import Search from './UserSearch'
const List = () => {
	const formatTimeDifference = (dateString) => {
		const currentDate = new Date()
		const targetDate = new Date(dateString)

		const timeDifference = currentDate - targetDate

		const seconds = Math.floor(timeDifference / 1000)
		const minutes = Math.floor(seconds / 60)
		const hours = Math.floor(minutes / 60)
		const days = Math.floor(hours / 24)
		const weeks = Math.floor(days / 7)
		const months = Math.floor(days / 30)
		const years = Math.floor(days / 365)

		if (years > 0) {
			return `${years} year${years > 1 ? 's' : ''} ago`
		} else if (months > 0) {
			return `${months} month${months > 1 ? 's' : ''} ago`
		} else if (weeks > 0) {
			return `${weeks} week${weeks > 1 ? 's' : ''} ago`
		} else if (days > 0) {
			return `${days} day${days > 1 ? 's' : ''} ago`
		} else if (hours > 0) {
			return `${hours} hour${hours > 1 ? 's' : ''} ago`
		} else if (minutes > 0) {
			return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
		} else {
			return 'Just now'
		}
	}
	const formatDuration = (durationString) => {
		switch (durationString) {
			case 'Short':
				return '1-2 Week'
			case 'Medium':
				return '1-2 Month'
			case 'Long':
				return 'Half Yearly'
			default:
				return '1-2 Month'
		}
	}
	const { userList, setUserList, token, user } =
		useContext(AuthContext)
	console.log(user)
	useEffect(() => {
		const getUserList = async () => {
			var response
			if (token) {
				try {
					if (user?.userType === 'admin') {
						response = await axios({
							method: 'get',
							credentials: 'include',
							url: 'http://localhost:8000/api/v1/admin/allRequest',
							headers: { Authorization: `Bearer ${token}` }
						})
					} else if (user?.userType === 'maintenance') {
						response = await axios({
							method: 'get',
							credentials: 'include',
							url: 'http://localhost:8000/api/v1/admin/all-approved',
							headers: { Authorization: `Bearer ${token}` }
						})
					}
					const res = response?.data
					console.log(res)
					setUserList(res?.data)
				} catch (e) {
					console.log(e)
					toast.error(
						'Some Error Ocurred While Fetching Users Please Try Register After Some Time'
					)
				}
			}
		}
		getUserList()
	}, [])
	let apiData = []
	console.log(userList)
	return (
		<>
			{userList?.length > 0 ? (
				<>
					<Search />
					<div className='flex barlow flex-col rounded-md items-center justify-center '>
						<div className='pt-2 overflow-scroll px-0 w-full'>
							<table className='mt-4 w-full min-w-max table-auto rounded-lg text-start border-2 border-separate  border-stone-300  '>
								<thead>
									<tr>
										<th className='cursor-pointer border-2 border-transparent border-b-gray-300 bg-stone-200/70 p-4 '>
											<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
												Name{' '}
											</p>
										</th>
										<th className='cursor-pointer border-2 border-transparent border-b-gray-300 bg-stone-200/70 p-4 '>
											<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
												Email{' '}
											</p>
										</th>
										<th className='cursor-pointer border-2 border-transparent border-b-gray-300 bg-stone-200/70 p-4 '>
											<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
												Class{' '}
											</p>
										</th>
										{/* <th className='cursor-pointer border-2 border-transparent border-b-gray-300 bg-stone-200/70 p-4 '>
									<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
										Year - Sem{' '}
									</p>
								</th> */}
										<th className='cursor-pointer border-2 border-transparent border-b-gray-300 bg-stone-200/70 p-4 '>
											<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
												Roll No{' '}
											</p>
										</th>
										<th className='cursor-pointer border-2 border-transparent border-b-gray-300 bg-stone-200/70 p-4 '>
											<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
												Duration
											</p>
										</th>
										<th className='cursor-pointer border-2 border-transparent border-b-gray-300 bg-stone-200/70 p-4 '>
											<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
												Requested
											</p>
										</th>
										{/* <th className='cursor-pointer border-2 border-transparent border-b-gray-300 bg-stone-200/70 p-4 '>
									<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
										Status
									</p>
								</th> */}
										<th className='cursor-pointer border-2 border-transparent border-b-gray-300 bg-stone-200/70 p-4 '>
											<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
												Approve
											</p>
										</th>
									</tr>
								</thead>
								<tbody>
									{userList?.map((el, idx) => {
										console.log(userList?.length === idx + 1)
										console.log(el?._id, 'req id')

										return (
											<tr
												key={idx}
												className='group p-2 rounded-xl hover:bg-[#d8f3dc]'
											>
												<td
													className={`p-4 ${
														userList?.length !== idx + 1
															? 'border-b border-stone-400/60'
															: null
													}  rounded-sm text-sm sm:text-base font-medium text-gray-800 `}
												>
													<div className='flex items-center gap-3'>
														<div className='flex flex-col'>
															{/* <p className='block antialiased   text-sm leading-normal text-blue-gray-900 font-normal'>
														React Project
													</p>
													<p className='block antialiased   text-sm leading-normal text-blue-gray-900 font-normal opacity-70'>
														Start date: 10 Dec 2023
													</p> */}
															<p>{el?.student_id?.fullname}</p>
														</div>
													</div>
												</td>
												<td
													className={`p-4 ${
														userList?.length !== idx + 1
															? 'border-b border-stone-400/60'
															: null
													}  rounded-sm text-sm sm:text-base font-medium text-gray-800 `}
												>
													<div className='flex items-center gap-3'>
														{/* <img
													src='https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg'
													alt='John Michael'
													className='inline-block relative object-cover object-center w-9 h-9 rounded-md'
												/>
												<div className='flex flex-col'>
													<p className='block antialiased   text-sm leading-normal text-blue-gray-900 font-normal'>
														John Michael
													</p>
													<p className='block antialiased   text-sm leading-normal text-blue-gray-900 font-normal opacity-70'>
														john@creative-tim.com
													</p>
												</div> */}
														<p>{el?.student_id?.domain_id}</p>
													</div>
												</td>
												<td
													className={`p-4 ${
														userList?.length !== idx + 1
															? 'border-b border-stone-400/60'
															: null
													}  rounded-sm text-xs sm:text-sm font-medium text-gray-800 text-center `}
												>
													<div className='flex flex-col'>
														<p className='block antialiased  leading-normal '>
															{el?.student_id?.department}
														</p>
														<p className='block antialiased   leading-normal opacity-80'>
															{el?.student_id?.year +
																' - ' +
																el?.student_id?.sem}
														</p>
													</div>
												</td>
												<td
													className={`p-4 ${
														userList?.length !== idx + 1
															? 'border-b border-stone-400/60'
															: null
													}  rounded-sm text-sm sm:text-base font-medium text-gray-800 text-center `}
												>
													<div className='w-max'>
														<p className='block antialiased '>
															{el?.student_id?.prn}
														</p>
													</div>
												</td>
												<td
													className={`p-4 ${
														userList?.length !== idx + 1
															? 'border-b border-stone-400/60'
															: null
													}  rounded-sm text-sm sm:text-base font-medium text-gray-800 text-center `}
												>
													<p className='block antialiased leading-normal '>
														{formatDuration(el?.duration)}
													</p>
												</td>
												<td
													className={`p-4 ${
														userList?.length !== idx + 1
															? 'border-b border-stone-400/60'
															: null
													}  rounded-sm text-sm sm:text-base font-medium text-gray-800 text-center `}
												>
													{/* <button
												className='relative align-middle select-none   font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30'
												type='button'
											>
												<span className='absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														viewBox='0 0 24 24'
														fill='currentColor'
														aria-hidden='true'
														className='h-4 w-4'
													>
														<path d='M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z'></path>
													</svg>
												</span>
											</button> */}
													<p className='block antialiased  leading-normal '>
														{formatTimeDifference(el?.createdAt)}
													</p>
												</td>
												<td
													className={`p-4 ${
														userList?.length !== idx + 1
															? 'border-b border-stone-400/60'
															: null
													}  rounded-sm text-sm sm:text-base font-medium text-gray-800 text-center `}
												>
													<Link
														to={
															user?.userType === 'admin'
																? `/admin/user/${el?._id}`
																: `/maintenance/issue/${el?._id}`
														}
														className='  '
														type='button'
													>
														<HiOutlineDocumentText className='h-4 w-4 sm:h-5 sm:w-5 lg:w-6 lg:h-6 group-hover:text-[#1b4332] group-hover:scale-125 ' />
													</Link>
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				</>
			) : (
				<div className='flex-grow flex flex-col justify-center mx-auto items-center max-w-4xl w-full h-full '>
					<div className='flex flex-col items-center justify-center w-full h-full max-w-5xl '>
						<h3 className='text-3xl sm:text-4xl md:text-5xl'>
							<LuUserCircle2 className=' text-[#52b788] w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 -ml-1 sm:-ml-2 md:-ml-3 ' />
						</h3>
						<h1 className='text-xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold '>
							No Issues to Scrutinize
						</h1>
					</div>
				</div>
			)}
		</>
	)
}

export default List
