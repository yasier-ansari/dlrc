import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { BiEditAlt } from 'react-icons/bi'
import { LuLaptop } from 'react-icons/lu'
import Search from './UserSearch'
import { Button } from '@/components/ui/Button.jsx'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog.jsx'
import { Textarea } from './ui/textarea'
import MaxWidthWrapper from './MaxWidthWrapper'
import { cn } from '@/lib/utils'

const LaptopIdList = () => {
	const textAreaRef = useRef(null)
	const [form, setForm] = useState({
		status: '',
		condition: '',
		rating: ''
	})
	const [modalOpen, setMoadalOpen] = useState(false)
	const handleChange = (e) => {
		const val = e.target?.value
		setForm({ ...form, [e.target.name]: val })
	}
	const [loading, setLoading] = useState(null)
	const [newList, setNewList] = useState()
	const [modalLoading, setModalLoading] = useState(false)
	const { userList, setUserList, token, user } =
		useContext(AuthContext)
	const [currentId, setCurrentId] = useState()
	const status_options = ['Free', 'Check-up']
	const rating_options = [
		'Poor',
		'Fair',
		'Good',
		'Very Good',
		'Excellent'
	]
	const updateStatus = async () => {
		setModalLoading(true)
		var response
		console.log(currentId?.laptop_id, form?.currStatus)
		try {
			response = await axios({
				method: 'post',
				url: `${process.env.REACT_BACKEND_PORT_URL}/api/v1/admin/change-laptop`,
				data: { status: form?.currStatus, id: currentId?.laptop_id },
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			const res = response?.data
			console.log(res)
			setLoading(false)
			setModalLoading(false)
			setMoadalOpen(false)
			toast.success(` Laptop status changed Successfully `)
		} catch (e) {
			setLoading(false)
			setMoadalOpen(false)
			setModalLoading(false)
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
						url: `${process.env.REACT_BACKEND_PORT_URL}/api/v1/admin/free-laptop`,
						headers: { Authorization: `Bearer ${token}` }
					})
				}
				const res = response?.data
				console.log('working')
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
	useEffect(() => {
		setLoading(true)
		try {
			// getUserList()
			getUserLaptop()
		} finally {
			setLoading(false)
		}
	}, [])
	console.log(form)
	return (
		<MaxWidthWrapper className='w-full  h-full items-center justify-center mx-auto max-w-5xl text-gray-800/90 py-6 flex grow px-8 md:px-12 lg:px-20 xl:px-24 flex-col'>
			{!loading ? (
				userList?.length > 0 ? (
					<Dialog>
						<Search
							userList={userList}
							setNewList={setNewList}
							laptopIdList={true}
						/>
						<div className='flex flex-col mx-auto overflow-x-scroll mb-10  max-w-6xl rounded-md items-center justify-center '>
							<div className='w-full overflow-hidden rounded-lg shadow-lg'>
								<div className='pt-2  px-0 w-full overflow-x-scroll '>
									<table className='mt-4 w-full min-w-max rounded-lg text-start border-2 border-separate border-stone-200 '>
										<thead>
											<tr className='text-md  text-gray-800 text-left spline rounded-md '>
												<th className='cursor-pointer p-4 bg-green-200/70 rounded-sm  '>
													<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
														Laptop Id{' '}
													</p>
												</th>
												<th className='cursor-pointer p-4 bg-green-200/70 rounded-sm   '>
													<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
														Status{' '}
													</p>
												</th>
												{/* <th className='cursor-pointer p-4 bg-green-200/70 rounded-sm cursor-pointer  '>
									<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
										Year - Sem{' '}
									</p>
								</th> */}
												<th className='cursor-pointer p-4 bg-green-200/70 rounded-sm  hidden md:table-cell text-center   '>
													<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
														Department
													</p>
												</th>
												<th className='cursor-pointer p-4 bg-green-200/70 rounded-sm text-center hidden xs:table-cell '>
													<p className='antialiased text-base lg:text-lg xl:text-xl text-gray-900 flex items-center justify-between  font-semibold '>
														Edit Status
													</p>
												</th>
											</tr>
										</thead>
										<tbody>
											{newList?.length > 0 ? (
												newList?.map((el, idx) => {
													console.log(userList?.length === idx + 1)
													console.log(el?._id, 'req id')

													return (
														<tr
															key={idx}
															className='group p-2 rounded-xl hover:bg-stone-200/60'
														>
															<td
																className={`p-4 rounded-sm text-sm sm:text-base font-medium text-gray-800 `}
															>
																<p className='block antialiased leading-normal '>
																	{el?.laptop_id}
																</p>
															</td>
															<td
																className={`p-4 rounded-sm text-sm sm:text-base font-medium text-gray-800`}
															>
																<p className='block antialiased   leading-normal opacity-80'>
																	{el?.condition}
																</p>
															</td>
															<td
																className={`p-4 hidden md:table-cell rounded-sm text-sm sm:text-base font-medium text-gray-800 text-center `}
															>
																<p className='block antialiased  leading-normal '>
																	{el?.department}
																</p>
															</td>
															<td
																className={` p-4 rounded-sm hidden xs:table-cell text-sm sm:text-base font-medium text-gray-800 text-center`}
															>
																<DialogTrigger asChild>
																	<button
																		onClick={(e) => {
																			setCurrentId(el)
																			setForm({
																				status: el?.status,
																				condition: el?.condition,
																				rating: el?.rating || ' '
																			})
																			setMoadalOpen(true)
																		}}
																		// className='bg-[#40916c] px-8'
																		// variant='outline'
																	>
																		<BiEditAlt className='h-4 w-4 sm:h-5 sm:w-5 group-hover:text-[#2c5846] group-hover:scale-125 ' />
																	</button>
																</DialogTrigger>
															</td>
														</tr>
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
															className={`p-4 rounded-sm text-sm sm:text-base font-medium text-gray-800 `}
														>
															<div className='flex items-center gap-3'>
																<p>ㅤㅤㅤㅤㅤ - ㅤㅤㅤㅤㅤ </p>
															</div>
														</td>
														<td
															className={`p-4 rounded-sm hidden md:table-cell text-sm sm:text-base font-medium text-gray-800 text-center `}
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
													</tr>
												</>
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
						{modalOpen && (
							<DialogContent className=' mx-1 sm:mx-0 max-w-[400px] sm:max-w-[500px]'>
								<DialogHeader>
									<DialogTitle>Edit Status</DialogTitle>
								</DialogHeader>
								<div className='grid gap-4 py-4 '>
									{/* <div className='flex justify-start space-x-4 items-start '>
										<Label
											htmlFor='name'
											className='text-right min-w-16 font-medium w-max pt-2'
										>
											Condition
										</Label>
										<Textarea
											id='name'
											name='prevStatus'
											value={currentId?.condition}
											disabled={true}
											className={cn(
												'col-span-3 bg-stone-300 w-full outline-[#40916c]'
											)}
										/>
									</div> */}
									{/* <div className='flex justify-start space-x-4 items-start '>
										<Label
											htmlFor='name'
											className='text-right min-w-16 font-medium w-max pt-2'
										>
											Status
										</Label>
										<Input
											id='name'
											name='prevStatus'
											value={currentId?.status}
											disabled={true}
											className={cn(
												'col-span-3 bg-stone-300 w-full outline-[#40916c]'
											)}
										/>
									</div> */}
									<div className='flex justify-start space-x-4 items-start '>
										<label
											htmlFor='status'
											className='  min-w-16 font-medium w-max pt-2 rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm '
										>
											Status
										</label>
										<select
											name='status'
											placeholder='status'
											value={form?.status}
											onChange={(e) => handleChange(e)}
											className='  font-medium text-[0.8rem] sm:text-base rounded-lg py-2 px-3 w-full bg-stone-200 focus-visible:outline-[#40916c]  '
										>
											<option value='' disabled hidden>
												Select Sem
											</option>
											{status_options?.map((el) => (
												<option value={el} key={el}>
													{el}
												</option>
											))}
										</select>
										{/* <Input
											id='name'
											name='status'
											value={form?.status}
											disabled={loading || modalLoading}
											onChange={(e) => {
												handleChange(e)
											}}
											className={cn(
												'col-span-3 bg-stone-300 w-full outline-[#40916c]'
											)}
										/> */}
									</div>
									<div className='flex justify-start space-x-4 items-start '>
										<label
											htmlFor='name'
											className='  min-w-16 font-medium w-max pt-2 rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm '
										>
											Rating
										</label>
										<select
											name='rating'
											placeholder='rating'
											value={form?.rating}
											onChange={(e) => handleChange(e)}
											className='  font-medium text-[0.8rem] sm:text-base rounded-lg py-2 px-3 w-full bg-stone-200 focus-visible:outline-[#40916c]  '
										>
											<option value='' disabled hidden>
												Rating
											</option>
											{rating_options?.map((el) => (
												<option value={el} key={el}>
													{el}
												</option>
											))}
										</select>
									</div>
									<div className='flex justify-start space-x-4 items-start '>
										<label
											htmlFor='condition'
											className='  min-w-16 font-medium w-max pt-2 rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm '
										>
											Condition
										</label>
										<Textarea
											id='condition'
											name='condition'
											value={form?.condition}
											disabled={loading || modalLoading}
											onChange={(e) => {
												handleChange(e)
											}}
											className={cn(
												' font-medium text-[0.8rem] sm:text-base rounded-lg py-2 px-3 w-full col-span-3 bg-stone-200 ring-[#40916c] outline-[#40916c] '
											)}
										/>
									</div>
								</div>
								<DialogFooter>
									<Button
										onClick={updateStatus}
										className={cn(
											'  bg-gradient-to-tr from-[#52b788] to-[#40916c]  focus-visible:ring-[#40916c] outline-[#40916c] '
										)}
										type='submit'
									>
										{modalLoading ? (
											<div className='flex items-center space-x-3 justify-center px-3 py-2 rounded-lg'>
												<p className='text-base md:text-lg '>
													Loading
												</p>
												<div className='animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-[2.2px] border-r-none border-r-white border-transparent'></div>
											</div>
										) : (
											'Save Changes'
										)}
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
		</MaxWidthWrapper>
	)
}

export default LaptopIdList
