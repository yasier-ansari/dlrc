import React, { useContext, useEffect, useRef, useState } from 'react'
// import { ListContext } from "../context/ListContext"
// import Paginator from "./Paginator";
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { BiEditAlt } from 'react-icons/bi'
import { LuLaptop, LuUserCircle2 } from 'react-icons/lu'
import Search from './UserSearch'
import { Button } from '@/components/ui/button.jsx'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import useAutosizeTextArea from '@/context/AutoResizer'
import { Textarea } from './ui/textarea'

const LaptopIdList = () => {
	const textAreaRef = useRef(null)
	const [form, setForm] = useState({ prevStatus: '', currStatus: '' })
	useAutosizeTextArea(textAreaRef, form?.prevStatus)
	useAutosizeTextArea(textAreaRef, form?.currStatus)
	const [modalOpen, setMoadalOpen] = useState(false)
	const handleChange = (e) => {
		const val = e.target?.value
		setForm({ ...form, [e.target.name]: val })
	}

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
	const [loading, setLoading] = useState(null)
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
	const [currentId, setCurrentId] = useState()
	const updateStatus = async () => {
		var response
		console.log(currentId?.laptop_id, form?.currStatus)
		try {
			response = await axios({
				method: 'post',
				url: `http://localhost:8000/api/v1/admin/change-laptop`,
				data: { status: form?.currStatus, id: currentId?.laptop_id },
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			const res = response?.data
			console.log(res)
			setLoading(false)
			setMoadalOpen(false)
			toast.success(` Laptop status changed Successfully `)
		} catch (e) {
			setLoading(false)
			setMoadalOpen(false)
			console.log(e)
			if (e?.response?.status === 404) {
				toast.error(' Technical Error, please contact developer')
			} else {
				toast.error(
					'Error Occurred, please try again after some time'
				)
			}
		}
	}
	const getUserLaptop = async () => {
		var response
		if (token) {
			try {
				if (user?.userType === 'maintenance') {
					console.log('issu here')
					response = await axios({
						method: 'get',
						credentials: 'include',
						url: 'http://localhost:8000/api/v1/admin/free-laptop',
						headers: { Authorization: `Bearer ${token}` }
					})
				}
				const res = response?.data
				console.log('working')
				console.log(res)
				setUserList(res?.data)
			} catch (e) {
				console.log(e)
				setUserList(null)
				toast.error(
					'Some Error Ocurred While Fetching Users Please Try Register After Some Time'
				)
			}
		}
	}
	useEffect(() => {
		setLoading(true)
		try {
			// getUserList()
			getUserLaptop()
		} finally {
			setLoading(false)
		}
	}, [])
	let apiData = []
	console.log(userList)
	return (
		<>
			{!loading ? (
				userList?.length > 0 ? (
					<Dialog>
						<Search laptopList={true} />
						<div className='flex barlow flex-col rounded-md items-center max-w-7xl  justify-center '>
							<div className='pt-2  px-0 w-full overflow-x-scroll '>
								<table className='overflow-scroll mt-4 w-full minw-max table-auto rounded-lg text-start border-2 border-separate  border-stone-300  '>
									<thead>
										<tr>
											<th className='cursor-pointer border-2 border-transparent border-b-gray-300 bg-stone-200/70 p-4 '>
												<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
													Laptop Id{' '}
												</p>
											</th>
											<th className='cursor-pointer border-2 border-transparent border-b-gray-300 bg-stone-200/70 p-4 '>
												<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
													Status{' '}
												</p>
											</th>
											{/* <th className='cursor-pointer border-2 border-transparent border-b-gray-300 bg-stone-200/70 p-4 '>
									<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
										Year - Sem{' '}
									</p>
								</th> */}
											<th className='cursor-pointer border-2 border-transparent border-b-gray-300 bg-stone-200/70 p-4 '>
												<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
													Department
												</p>
											</th>
											<th className='cursor-pointer border-2 border-transparent border-b-gray-300 bg-stone-200/70 p-4 '>
												<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
													Edit Status
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
													{/* <td
														className={`p-4 ${
															userList?.length !== idx + 1
																? 'border-b border-stone-400/60'
																: null
														}  rounded-sm text-sm sm:text-base font-medium text-gray-800 `}
													>
														<div className='flex flex-col'>
															<div className='flex items-center space-x-3'>
																<p className='block antialiased  leading-normal '>
																	{el?.laptop_id}
																</p>
																<p className='block antialiased   leading-normal opacity-80'>
																	{el?.condition}
																</p>
															</div>
															<p className='block antialiased   leading-normal opacity-80'>
																{el?.department}
															</p>
														</div>
													</td> */}
													<td
														className={`p-4 ${
															userList?.length !== idx + 1
																? 'border-b border-stone-400/60'
																: null
														}  rounded-sm text-xs sm:text-sm font-medium text-gray-800 text-center `}
													>
														<p className='block antialiased leading-normal '>
															{el?.laptop_id}
														</p>
													</td>
													<td
														className={`p-4 ${
															userList?.length !== idx + 1
																? 'border-b border-stone-400/60'
																: null
														}  rounded-sm text-sm sm:text-base font-medium text-gray-800 text-center `}
													>
														<p className='block antialiased   leading-normal opacity-80'>
															{el?.condition}
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
															{el?.department}
														</p>
													</td>
													{/* <td
														className={`p-4 ${
															userList?.length !== idx + 1
																? 'border-b border-stone-400/60'
																: null
														}  rounded-sm text-sm sm:text-base font-medium text-gray-800 text-center `}
													>
														<p className='block antialiased  leading-normal '>
															{el?.laptop_id}
														</p>
													</td> */}
													<td
														className={`p-4 ${
															userList?.length !== idx + 1
																? 'border-b border-stone-400/60'
																: null
														}  rounded-sm text-sm sm:text-base font-medium text-gray-800 text-center `}
													>
														{/* <Link
															to={`/maintenance/return/${el?._id}`}
															className='  '
															type='button'
														>
															<BiEditAlt className='h-4 w-4 sm:h-5 sm:w-5 lg:w-6 lg:h-6 group-hover:text-[#1b4332] group-hover:scale-125 ' />
														</Link> */}
														<DialogTrigger asChild>
															<Button
																onClick={(e) => {
																	setCurrentId(el)
																	setMoadalOpen(true)
																	setForm({
																		...form,
																		status: el?.condition
																	})
																}}
																variant='outline'
															>
																Edit Profile
															</Button>
														</DialogTrigger>
													</td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>
						</div>
						{modalOpen && (
							<DialogContent className='sm:max-w-[500px]'>
								<DialogHeader>
									<DialogTitle>Edit Status</DialogTitle>
								</DialogHeader>
								<div className='grid gap-4 py-4'>
									<div className='grid grid-cols-4 items-center gap-4'>
										<Label htmlFor='name' className='text-right'>
											Current
										</Label>
										<Textarea
											id='name'
											name='prevStatus'
											value={currentId?.condition}
											disabled={true}
											className='col-span-3 bg-stone-200 '
										/>
									</div>
									<div className='grid grid-cols-4 items-center gap-4'>
										<Label htmlFor='username' className='text-right'>
											Edit
										</Label>
										<Textarea
											id='name'
											name='currStatus'
											value={form?.currStatus}
											disabled={loading}
											onChange={(e) => {
												handleChange(e)
											}}
											className='col-span-3 bg-stone-200 '
										/>
									</div>
								</div>
								<DialogFooter>
									<Button onClick={updateStatus} type='submit'>
										Save changes
									</Button>
								</DialogFooter>
							</DialogContent>
						)}
					</Dialog>
				) : (
					<div className='flex-grow flex flex-col justify-center mx-auto items-center max-w-4xl w-full h-full '>
						<div className='flex flex-col items-center justify-center w-full h-full max-w-5xl '>
							<h3 className='text-3xl sm:text-4xl md:text-5xl'>
								<LuLaptop className=' text-[#52b788] w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 -ml-1 sm:-ml-2 md:-ml-3 ' />
							</h3>
							<h1 className='text-xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold '>
								No Allotted Laptop to see here
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
		</>
	)
}

export default LaptopIdList
