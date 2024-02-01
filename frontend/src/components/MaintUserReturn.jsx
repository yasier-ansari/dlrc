import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaRegHandPointDown } from 'react-icons/fa'
import { LuUserCircle2 } from 'react-icons/lu'
import { AuthContext } from '../context/AuthContext'
import { BsArrowsFullscreen } from 'react-icons/bs'
import useAutosizeTextArea from '../context/AutoResizer'
import { TbUserSquareRounded } from 'react-icons/tb'
import { HiOutlineComputerDesktop } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { IoWarningOutline } from 'react-icons/io5'
import MaxWidthWrapper from './MaxWidthWrapper'
const MaintUserReturnComp = ({ flag, id }) => {
	const {
		setModalPopped,
		mainLoading,
		token,
		setUserInfo,
		userInfo,
		user
	} = useContext(AuthContext)
	const [form, setForm] = useState({
		condition: ''
		// , rating: ''
	})
	const [errors, setErrors] = useState({
		condition: ''
		// rating: ''
	})
	const [userNotFound, setuserNotFound] = useState(false)
	const textAreaRef = useRef(null)
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	useAutosizeTextArea(textAreaRef, form?.reason)
	const handleChange = (e) => {
		const val = e.target?.value
		setForm({ ...form, condition: val })
	}
	function formatDate(inputDate) {
		const options = {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}
		const formattedDate = new Date(inputDate).toLocaleDateString(
			'en-US',
			options
		)
		return formattedDate
	}
	const validateForm = () => {
		let valid = true
		const newErrors = { ...errors }
		if (!form?.condition) {
			newErrors.condition = 'condition is required'
			valid = false
		} else if (form?.condition?.split(/\s+/)?.length < 5) {
			newErrors.condition =
				'Atleast 5 word long condition status is required'
			valid = false
		} else {
			newErrors.condition = ''
			valid = true
		}

		// if (!form?.rating) {
		// 	newErrors.rating = 'Rating is required'
		// 	valid = false
		// } else if (!rating_options.includes(form?.rating)) {
		// 	newErrors.rating = 'Please select a valid rating'
		// 	valid = false
		// } else {
		// 	newErrors.rating = ''
		// }

		setErrors(newErrors)
		return valid
	}
	const retreiveHelper = async () => {
		var response
		try {
			response = await axios({
				method: 'post',
				url: `${process.env.REACT_BACKEND_PORT_URL}/api/v1/admin/new-return/${userInfo?._id}`,
				data: {
					condition: form?.reason,
					laptop_id: userInfo?.laptop_id
				},
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			const res = response?.data
			console.log(res)
			// setLoginData(res?.data)
			// setUser(res?.data?._doc)
			setLoading(false)
			toast.success(` Laptop Retireved Successfully `)
			navigate('/maintenance/user')
		} catch (e) {
			setLoading(false)
			console.log(e)
			if (e?.response?.status === 404) {
				toast.error(' Technical Error, please contact developer')
			} else {
				setErrors({
					reason: ''
				})
				toast.error(
					'Error Occurred, please try again after some time'
				)
			}
		}
	}
	const SubmitHandler = async (e) => {
		e.preventDefault()
		setLoading(true)
		if (validateForm()) {
			await retreiveHelper()
		}
		setLoading(false)
	}

	useEffect(() => {
		setLoading(true)
		const getUserInfo = async () => {
			if (user?.userType === 'maintenance') {
				var response
				try {
					response = await axios({
						method: 'get',
						url: `${process.env.REACT_BACKEND_PORT_URL}/api/v1/admin/issued-laptop/${id}`,
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					const res = response?.data
					console.log(res)
					setUserInfo(res.data)
					setLoading(false)
				} catch (e) {
					console.log(e)
					setLoading(false)
					setuserNotFound(true)
					toast.error("Couldn't Find Request with given Id")
				}
			}
		}
		getUserInfo()
		setLoading(false)
	}, [])
	console.log(userInfo)
	const rating_options = [
		'Poor',
		'Fair',
		'Good',
		'Very Good',
		'Excellent'
	]
	return (
		<MaxWidthWrapper className='w-full h-full items-center justify-center mx-auto max-w-6xl text-gray-800/90 py-6 flex grow px-8 md:px-12 lg:px-20 xl:px-24 flex-col'>
			{!loading || !mainLoading ? (
				!userNotFound ? (
					<>
						<div className='flex flex-col items-center justfiy-center max-w-4xl w-full h-full text-gray-800/90 mx-auto'>
							<div className='flex items-center space-x-2 text-3xl sm:text-4xl  md:text-5xl lg:text-6xl justify-center w-full h-full mt-6 sm:mt-10 md:mt-0 mb-12 text-center mx-auto'>
								<HiOutlineComputerDesktop className=' text-[#40916c] -skew-x-6 ' />
								<h1 className='font-bold  italic'>Retrieve</h1>
							</div>
						</div>
						<div className='flex items-center w-full justify-center mx-auto flex-col space-y-4  max-w-5xl  mb-20'>
							<div className='flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl space-y-6 md:space-y-8 border-2 border-[#40916c40] relative opacity-80 '>
								<div
									className='absolute inset-0 left-[50%] translate-x-[-50%] -top-5 
'
								>
									<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full mx-auto '>
										<p className='p-2 text-xs sm:text-base sm:px-4 md:px-6  bg-gradient-to-tr from-[#52b788] font-semibold  to-[#40916c] text-white rounded-xl mx-auto'>
											Issuance
										</p>
									</div>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6'>
									<div className='flex flex-col items-start justify-center space-y-2 basis-[60%] w-full'>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Name
										</p>
										<p className='truncate  font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200'>
											{userInfo?.req_id?.student_id?.fullname}
										</p>
									</div>
									<div className='flex items-start justify-center space-y-2 flex-col basis-[40%] w-full'>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Email
										</p>
										<p className='truncate  font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200'>
											{userInfo?.req_id?.student_id?.domain_id}
										</p>
									</div>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-3 '>
									<div className='flex w-full md:basis-[50%] items-start justify-center space-y-2 flex-col '>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Prn
										</p>
										<p className='   font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 '>
											{userInfo?.req_id?.student_id?.prn}
										</p>
									</div>
									<div className='flex w-full md:basis-[50%] items-start justify-center space-y-2 flex-col '>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Dept
										</p>
										<p className='  font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 '>
											{userInfo?.req_id?.student_id?.department}
										</p>
									</div>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-3 '>
									<div className='flex w-full md:basis-[50%] items-start justify-center space-y-2 flex-col '>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Year
										</p>
										<p className='   font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 '>
											{userInfo?.req_id?.student_id?.year}
										</p>
									</div>
									<div className='flex w-full md:basis-[50%]  items-start justify-center space-y-2 flex-col '>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Sem
										</p>
										<p className='  font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 '>
											{userInfo?.req_id?.student_id?.sem}
										</p>
									</div>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-3 '>
									<div className='flex flex-col items-start justify-center space-y-2  w-full '>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Approved On
										</p>
										<p className='  font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 h-auto  focus:outline-[#74c69d] '>
											{formatDate(userInfo?.req_id?.updatedAt)}
										</p>
									</div>
									<div className='flex flex-col items-start justify-center space-y-2  w-full '>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Issued On
										</p>
										<p className='  font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 h-auto  focus:outline-[#74c69d] '>
											{formatDate(userInfo?.createdAt)}
										</p>
									</div>
								</div>
							</div>
							<div className='w-full flex items-center  justify-between space-x-6 '>
								<div className='flex flex-col items-start justify-center space-y-2  w-full '>
									<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
										Laptop Condition
									</p>
									<textarea
										ref={textAreaRef}
										rows={3}
										id='review-text'
										onChange={handleChange}
										value={form?.condition}
										disabled={loading}
										className='  outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg rounded-lg p-2 sm:px-3 w-full bg-stone-200 h-auto font-medium resize-none focus:outline-[#74c69d] '
									>
										still in nice condition
									</textarea>
									<p className='text-[#db3100] text-start text-xs sm:text-sm ml-2 font-normal '>
										{errors.condition || '‎'}
									</p>
								</div>
							</div>
							<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 mx-auto max-w-lg '>
								<button
									onClick={(e) => {
										SubmitHandler(e)
									}}
									disabled={loading}
									className='flex flex-col items-start justify-center space-y-2  w-full text-white'
								>
									<p className='font-medium text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-gradient-to-tr from-[#52b788] hover:scale-105 md:hover:scale-110 transition-all duration-300 ease-linear to-[#40916c]  '>
										{loading ? (
											<div className='flex items-center space-x-3 justify-center px-3 rounded-lg'>
												<p className='text-base md:text-lg '>
													Loading
												</p>
												<div className='animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-[2.2px] border-r-none border-r-white border-transparent'></div>
											</div>
										) : (
											'Retreive'
										)}
									</p>
								</button>
							</div>
						</div>
					</>
				) : (
					<div className='flex flex-col items-center justify-center w-full h-full max-w-5xl '>
						<h3 className='text-3xl sm:text-4xl md:text-5xl'>
							<TbUserSquareRounded className=' text-[#52b788] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 -ml-1 sm:-ml-2 md:-ml-3 ' />
						</h3>
						<h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold '>
							Oops!
						</h1>
						<div className='text-base sm:text-lg md:text-lg lg:text-xl  py-4 sm:py-5 md:py-6 lg:py-8 font-bold flex items-center justify-center text-center mx-auto max-w-xl sm:max-w-2xl md:max-w-3xl '>
							<p>No Student with id {`${id}`} Found 😥</p>
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

export default MaintUserReturnComp
