import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { HiOutlineDocumentText } from 'react-icons/hi2'
import { LuArrowDownUp, LuUserCircle2 } from 'react-icons/lu'
import Search from './UserSearch'
import MaxWidthWrapper from './MaxWidthWrapper'
const List = () => {
	const [newList, setNewList] = useState()
	const [emailOrder, setEmailOrder] = useState('asc')
	const [classOrder, setclassOrder] = useState('asc')
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
	const [loading, setLoading] = useState(true)
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
					setNewList(res?.data)
				} catch (e) {
					console.log(e)
					setUserList(null)
					setNewList(null)
					toast.error(
						'Some Error Ocurred While Fetching Users Please Try Register After Some Time'
					)
				}
			}
		}
		try {
			getUserList()
		} finally {
			setLoading(false)
		}
	}, [])
	let apiData = []
	console.log(userList)
	const sortData = (data, sortBy, sortOrder) => {
		if (data?.length > 0) {
			const newData = data.slice().sort((a, b) => {
				const aValue =
					sortBy === 'domain_id'
						? a.student_id[sortBy]
						: a.student_id[sortBy].toLowerCase()
				const bValue =
					sortBy === 'domain_id'
						? b.student_id[sortBy]
						: b.student_id[sortBy].toLowerCase()

				if (sortOrder === 'asc') {
					return aValue.localeCompare(bValue, undefined, {
						sensitivity: 'base'
					})
				} else {
					return bValue.localeCompare(aValue, undefined, {
						sensitivity: 'base'
					})
				}
			})
			setNewList(newData)
		}
	}
	const sortList = (tag) => {
		sortData(
			newList,
			tag === 'domain_id' ? 'domain_id' : 'department',
			tag === 'domain_id' ? emailOrder : classOrder
		)
	}
	return (
		<MaxWidthWrapper className='w-full  h-full items-center justify-center mx-auto max-w-5xl text-gray-800/90 py-6 flex grow px-8 md:px-12 lg:px-20 xl:px-24 flex-col'>
			{!loading ? (
				userList?.length > 0 ? (
					<>
						<Search
							userList={userList}
							setNewList={setNewList}
							laptopList={false}
						/>
						<div className='flex flex-col mx-auto overflow-x-scroll  max-w-6xl rounded-md items-center justify-center '>
							<div className='w-full mb-8 overflow-hidden rounded-lg shadow-lg'>
								<div className='pt-2 w-full overflow-x-auto px-0'>
									<table className='mt-4 w-full min-w-max rounded-lg text-start border-2 border-separate border-stone-200  '>
										<thead>
											<tr className='text-md  text-gray-800 text-left spline rounded-md  '>
												{/* <th className='cursor-pointer p-4 bg-green-200/70 rounded-sm'>
													<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
														Name{' '}
													</p>
												</th> */}
												<th className='cursor-pointer p-4 bg-green-200/70 rounded-sm'>
													<button
														onClick={() => {
															setEmailOrder(
																emailOrder === 'asc' ? 'desc' : 'asc'
															)
															sortList('domain_id')
														}}
														className='flex items-center justify-between w-full'
													>
														<p className='antialiased text-base lg:text-lg flex items-center justify-between font-medium  '>
															Info{' '}
														</p>
														<div>
															<LuArrowDownUp className='text-gray-700' />
														</div>
													</button>
												</th>
												<th className='cursor-pointer hidden md:table-cell p-4 bg-green-200/70 rounded-sm'>
													<button
														onClick={() => {
															setclassOrder(
																classOrder === 'asc' ? 'desc' : 'asc'
															)
															sortList('department')
														}}
														className='flex items-center justify-between w-full'
													>
														<p className='antialiased text-base lg:text-lg flex items-center justify-between font-medium  '>
															Class{' '}
														</p>
														<div>
															<LuArrowDownUp className='text-gray-700' />
														</div>
													</button>
												</th>
												{/* <th className='cursor-pointer p-4 bg-green-200/70 rounded-sm'>
									<p className='antialiased text-base lg:text-lg flex items-center justify-between font-medium  '>
										Year - Sem{' '}
									</p>
								</th> */}
												<th className=' hidden xl:table-cell cursor-pointer p-4 bg-green-200/70 rounded-sm'>
													<p className='antialiased text-base lg:text-lg flex items-center justify-between font-medium  '>
														Roll No{' '}
													</p>
												</th>
												<th className='cursor-pointer hidden lg:table-cell p-4 bg-green-200/70 rounded-sm'>
													<p className='antialiased text-base lg:text-lg flex items-center justify-between font-medium  '>
														Duration
													</p>
												</th>
												<th className=' hidden xs:table-cell cursor-pointer p-4 bg-green-200/70 rounded-sm'>
													<p className='antialiased text-base lg:text-lg flex items-center justify-between font-medium  '>
														Requested
													</p>
												</th>
												{/* <th className='cursor-pointer p-4 bg-green-200/70 rounded-sm'>
									<p className='antialiased text-base lg:text-lg flex items-center justify-between font-medium  '>
										Status
									</p>
								</th> */}
												<th className='cursor-pointer hidden sm:table-cell p-4 bg-green-200/70 rounded-sm'>
													<p className='antialiased text-base lg:text-lg flex items-center justify-between font-medium  '>
														Approve
													</p>
												</th>
											</tr>
										</thead>
										<tbody>
											{newList?.length > 0 ? (
												newList?.map((el, idx) => {
													return (
														<>
															<tr
																key={el?._id}
																className='group p-2 rounded-xl hover:bg-stone-200/60'
															>
																<td
																	className={`p-4 rounded-sm text-sm sm:text-base font-medium text-gray-800 `}
																>
																	<div className='flex items-center gap-3'>
																		<div className='flex flex-col'>
																			<p className='block antialiased   text-sm leading-normal text-blue-gray-900 font-normal'>
																				{el?.student_id?.fullname}
																			</p>
																			<p>
																				{el?.student_id?.domain_id}
																			</p>
																		</div>
																	</div>
																</td>
																{/* <td
																	className={`p-4 rounded-sm text-sm sm:text-base font-medium text-gray-800 `}
																>
																	<div className='flex items-center gap-3'>
																		<p>{el?.student_id?.domain_id}</p>
																	</div>
																</td> */}
																<td
																	className={`p-4 rounded-sm hidden md:table-cell text-xs sm:text-sm font-medium text-gray-800 text-center `}
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
																	className={`p-4 rounded-sm hidden xl:table-cell text-sm sm:text-base font-medium text-gray-800 text-center `}
																>
																	<div className='w-max'>
																		<p className='block antialiased '>
																			{el?.student_id?.prn}
																		</p>
																	</div>
																</td>
																<td
																	className={`p-4 hidden lg:table-cell  rounded-sm text-sm sm:text-base font-medium text-gray-800 text-center `}
																>
																	<p className='block antialiased leading-normal '>
																		{formatDuration(el?.duration)}
																	</p>
																</td>
																<td
																	className={`p-4 hidden xs:table-cell rounded-sm text-sm sm:text-base font-medium text-gray-800 text-center `}
																>
																	<p className='block antialiased  leading-normal '>
																		{formatTimeDifference(
																			el?.createdAt
																		)}
																	</p>
																</td>
																<td
																	className={` p-4 rounded-sm hidden sm:table-cell  text-sm sm:text-base font-medium text-gray-800 text-center `}
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
														</>
													)
												})
											) : (
												<>
													<tr
														key={'escape'}
														className='group p-2 rounded-xl hover:bg-[#f0fff2]'
													>
														<td
															className={`p-4 rounded-sm text-sm sm:text-base font-medium text-gray-800 `}
														>
															<div className='flex items-center gap-3'>
																<div className='flex flex-col'>
																	<p>ㅤㅤㅤ - ㅤㅤㅤ </p>
																</div>
															</div>
														</td>
														<td
															className={`p-4 rounded-sm hidden md:table-cell text-xs sm:text-sm font-medium text-gray-800 text-center `}
														>
															<div className='flex flex-col'>
																<p className='block antialiased  leading-normal '>
																	ㅤㅤㅤ - ㅤㅤㅤ
																</p>
															</div>
														</td>
														<td
															className={`p-4 rounded-sm hidden lg:table-cell text-sm sm:text-base font-medium text-gray-800 text-center `}
														>
															<div className='w-max'>
																<p className='block antialiased '>
																	ㅤㅤ- ㅤㅤ
																</p>
															</div>
														</td>
														<td
															className={`p-4 rounded-sm  hidden xl:table-cell text-sm sm:text-base font-medium text-gray-800 text-center `}
														>
															<p className='block antialiased leading-normal '>
																ㅤㅤ- ㅤㅤ
															</p>
														</td>
														<td
															className={`p-4 hidden xs:table-cell rounded-sm text-sm sm:text-base font-medium text-gray-800 text-center `}
														>
															<p className='block antialiased  leading-normal '>
																ㅤㅤ -ㅤㅤ
															</p>
														</td>
														<td
															className={`p-4 rounded-sm hidden sm:table-cell text-sm sm:text-base font-medium text-gray-800 text-center `}
														>
															ㅤㅤ-ㅤㅤ
														</td>
													</tr>
												</>
											)}
										</tbody>
									</table>
								</div>
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
				)
			) : (
				<div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-500 z-50'>
					<div className='flex items-center space-x-3 bg-white px-3 py-2 rounded-lg'>
						<h2 className='text-lg font-semibold'>Loading</h2>
						<div className='animate-spin rounded-full h-4 w-4 border-[2.2px] border-r-none border-r-white border-[#40916c]'></div>
					</div>
				</div>
			)}
		</MaxWidthWrapper>
	)
}

export default List
