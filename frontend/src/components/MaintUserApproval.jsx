import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaRegHandPointDown } from 'react-icons/fa'
import { LuUserCircle2 } from 'react-icons/lu'
import { AuthContext } from '../context/AuthContext'
import { BsArrowsFullscreen } from 'react-icons/bs'
import useAutosizeTextArea from '../context/AutoResizer'
import { TbUserSquareRounded } from 'react-icons/tb'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { IoWarningOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import MaxWidthWrapper from './MaxWidthWrapper'
import { DialogTrigger } from './ui/dialog'

const MaintUserApprovalComp = ({ flag, id }) => {
	const {
		setModalPopped,
		userType,
		token,
		setUserInfo,
		userInfo,
		mainLoading,
		setDialogImage
	} = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const [laptopOpt, setLaptopOpt] = useState(null)
	const navigate = useNavigate()
	const dur_options = [
		{ value: 'Short', text: '2-4 Weeks', id: 1 },
		{ value: 'Medium', text: '1-2 Months', id: 2 },
		{ value: 'Long', text: ' Whole Semester', id: 3 }
	]
	const laptop_options = [
		{ value: '3443jh4g32j4gj2h34', text: 'Laptop L1', id: 1 },
		{ value: '3563jh4g32j4gj2h34', text: 'Laptop L2', id: 2 },
		{ value: '3443jh4g32j4g88h34', text: ' Laptop L3', id: 3 }
	]
	const [form, setForm] = useState({
		reason: '',
		duration: '',
		laptop_id: ''
	})
	const [errors, setErrors] = useState({
		reason: '',
		duration: '',
		laptop_id: ''
	})
	const formatTimeDifference = (inputDate) => {
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
	const [userNotFound, setuserNotFound] = useState(false)
	const textAreaRef = useRef(null)
	const handleChange = (e) => {
		const val = e.target?.value
		setForm({ ...form, reason: val })
	}
	const validateForm = () => {
		let valid = true
		const newErrors = { ...errors }
		if (!form?.reason) {
			newErrors.reason = 'Reason is required'
			valid = false
		} else if (form?.reason?.split(/\s+/)?.length < 5) {
			newErrors.reason = 'Atleast 5 word long reason is required'
			valid = false
		} else {
			newErrors.reason = ''
		}
		if (!form?.duration) {
			newErrors.duration = 'Duration is required'
			valid = false
		} else if (
			!dur_options.some((option) => option.value === form?.duration)
		) {
			newErrors.duration = 'Enter a Valid Duration'
			valid = false
		} else {
			newErrors.duration = ''
		}
		if (!form?.laptop_id) {
			newErrors.laptop_id = 'Issue a Laptop'
			valid = false
		} else if (
			!laptopOpt.some(
				(option) => option.laptop_id === form?.laptop_id
			)
		) {
			newErrors.laptop_id = 'Issue a free Laptop'
			valid = false
		} else {
			newErrors.laptop_id = ''
		}
		setErrors(newErrors)
		return valid
	}
	const updateHelper = async (approve) => {
		var response
		try {
			response = await axios({
				method: 'POST',
				url: `${import.meta.env.VITE_REACT_BACKEND_PORT_URL
					}/api/v1/admin/new-issue`,
				data: {
					duration: form?.duration,
					req_id: userInfo?._id,
					laptop_id: form?.laptop_id
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
			toast.success(` Request ${approve} Successfully `)
			navigate('/maintenance/user')
		} catch (e) {
			setLoading(false)

			console.log(e)
			if (e?.response?.status === 400) {
				setErrors({
					reason: ''
				})
				toast.success(' Student is Already Approved ')
				navigate('/maintenance/user')
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

	const SubmitHandler = async (e, text) => {
		// e.preventDefault()
		// if (validateForm()) {
		// 	if (text == 'accept') {
		// 		console.log('accepted')
		// 	} else if (text == 'reject') {
		// 		console.log('rejected')
		// 	} else {
		// 		console.log('dont give gibberish')
		// 	}
		// }
		// else {
		// 	console.log('give real ting')
		// }
		setLoading(true)
		e.preventDefault()
		if (validateForm()) {
			if (text === 'Accept') {
				await updateHelper(text)
			} else {
				navigate('/maintenance/user')
			}
		} else {
			toast('Please provide a approval status ', {
				id: `${e}`,
				icon: (
					<IoWarningOutline className='h-6 w-6 md:w-8 md:h-8 text-orange-500 ' />
				),
				style: {
					border: '2px solid #fb923c',
					padding: '12px 20px 12px 20px',
					color: '#333'
				},
				iconTheme: {
					primary: '#fb923c',
					secondary: '#FFFAEE'
				}
			})
		}
		setLoading(false)
	}
	const getAllLaptop = async () => {
		var response
		try {
			setLoading(true)
			response = await axios({
				method: 'GET',
				url: `${import.meta.env.VITE_REACT_BACKEND_PORT_URL
					}/api/v1/admin/free-laptop`,
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			const res = response?.data
			console.log(res)
			setLaptopOpt(res.data)
			setLoading(false)
		} catch (e) {
			setLoading(false)
			setLaptopOpt(null)
			toast.error("Couldn't Find Request with given Id")
		}
	}

	useEffect(() => {
		const getUserInfo = async () => {
			var response
			try {
				setLoading(true)
				response = await axios({
					method: 'GET',
					url: `${import.meta.env.VITE_REACT_BACKEND_PORT_URL
						}/api/v1/admin/approved-request/${id}`,
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				const res = response?.data
				console.log(res)
				setUserInfo(res.data)
				setLoading(false)
			} catch (e) {
				setLoading(false)
				setuserNotFound(true)
				toast.error("Couldn't Find Request with given Id")
			}
		}
		getUserInfo()
		getAllLaptop()
	}, [id])

	return (
		<MaxWidthWrapper className='w-full h-full items-center justify-center mx-auto max-w-6xl text-gray-800/90 py-6 flex grow px-8 md:px-12 lg:px-20 xl:px-24 flex-col'>
			{!loading ? (
				!userNotFound ? (
					<>
						<div className='flex flex-col items-center justfiy-center max-w-4xl w-full h-full text-gray-800/90 mx-auto'>
							<div className='flex items-center space-x-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl justify-center w-full h-full m-6 sm:m-8 md:m-12 sm:mt-3 md:mt-0  text-center mx-auto'>
								<LuUserCircle2 className='text-green-prim-1 -skew-x-6' />
								<h1 className='font-bold  italic'>Issuance</h1>
							</div>
						</div>
						<div className='flex items-center w-full justify-center mx-auto flex-col space-y-4 sm:space-y-6 md:space-y-8 max-w-5xl  mb-20'>
							{/* <p>
                        To borrow a laptop, you're required to agree to the University&apos;s policies relating to Security, Acceptable Use and IT Asset Management.Students who do not agree to these policies will not be issued with a device.
                        Please note the given rules and regulations
                    </p> */}
							<div className='flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl space-y-6 md:space-y-8 border-2 border-[#40916c40] relative opacity-80 '>
								<div
									className='absolute inset-0 left-[50%] translate-x-[-50%] -top-5 
'
								>
									<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full mx-auto '>
										<p className='p-2 text-xs sm:text-base sm:px-4 md:px-6  bg-gradient-to-tr from-[#52b788] font-semibold  to-green-prim-1 text-white rounded-xl mx-auto'>
											Request
										</p>
									</div>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6'>
									<div className='flex flex-col items-start justify-center space-y-2 basis-[60%] w-full'>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Name
										</p>
										<p className='truncate  font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200'>
											{userInfo?.student_id?.fullname}
										</p>
									</div>
									<div className='flex items-start justify-center space-y-2 flex-col basis-[40%] w-full'>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Email
										</p>
										<p className=' truncate font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200'>
											{userInfo?.student_id?.domain_id}
										</p>
									</div>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-3 '>
									<div className='flex w-full  md:basis-[50%] items-start justify-center space-y-2 flex-col '>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Prn
										</p>
										<p className='  truncate font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200 '>
											{userInfo?.student_id?.prn}
										</p>
									</div>
									<div className='flex w-full  md:basis-[50%] items-start justify-center space-y-2 flex-col '>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Dept
										</p>
										<p className=' truncate font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200 '>
											{userInfo?.student_id?.department}
										</p>
									</div>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-3 '>
									<div className='flex w-full md:basis-[50%] items-start justify-center space-y-2 flex-col '>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Year
										</p>
										<p className='  truncate font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200 '>
											{userInfo?.student_id?.year}
										</p>
									</div>
									<div className='flex w-full md:basis-[50%]  items-start justify-center space-y-2 flex-col '>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Sem
										</p>
										<p className=' truncate font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200 '>
											{userInfo?.student_id?.sem}
										</p>
									</div>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6  '>
									<DialogTrigger
										onClick={(e) => {
											setDialogImage(
												`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com//id-card/${userInfo?.student_id?.idCard}`
											)
											setModalPopped(
												`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com//id-card/${userInfo?.student_id?.idCard}` ||
												'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
											)
										}}
										className='flex flex-col items-start justify-center space-y-2 basis-[60%] w-full '
									>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Id Card
										</p>
										<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg '>
											<div className='absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 '>
												<BsArrowsFullscreen className='w-12 h-12 stroke-[1.5] ' />
											</div>
											<img
												src={
													`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com//id-card/${userInfo?.student_id?.idCard}` ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
												}
												className='w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg aspect-video'
											/>
										</div>
									</DialogTrigger>
									<DialogTrigger
										onClick={(e) => {
											setDialogImage(
												`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com/${userInfo?.pdc}`
											)
											setModalPopped(
												`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com/${userInfo?.pdc}` ||
												'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
											)
										}}
										className='flex flex-col items-start justify-center space-y-2 basis-[60%] w-full '
									>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Pdc
										</p>
										<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg '>
											<div className='absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 '>
												<BsArrowsFullscreen className='w-12 h-12 stroke-[1.5] ' />
											</div>
											<img
												src={
													`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com/${userInfo?.pdc}` ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
												}
												className='w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg aspect-video'
											/>
										</div>
									</DialogTrigger>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6  '>
									<DialogTrigger
										onClick={(e) => {
											setDialogImage(
												`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com/${userInfo?.parents_Dec}`
											)
											setModalPopped(
												`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com/${userInfo?.parents_Dec}` ||
												'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
											)
										}}
										className='flex flex-col items-start justify-center space-y-2 basis-[60%] w-full '
									>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Parent Dec
										</p>
										<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg '>
											<div className='absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 '>
												<BsArrowsFullscreen className='w-12 h-12 stroke-[1.5] ' />
											</div>
											<img
												src={
													`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com/${userInfo?.parents_Dec}` ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
												}
												className='w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg aspect-video'
											/>
										</div>
									</DialogTrigger>
									<DialogTrigger
										onClick={(e) => {
											setDialogImage(
												`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com/${userInfo?.students_Dec}`
											)
											setModalPopped(
												`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com/${userInfo?.students_Dec}` ||
												'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
											)
										}}
										className='flex flex-col items-start justify-center space-y-2 basis-[60%] w-full '
									>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Student Dec
										</p>
										<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg '>
											<div className='absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 '>
												<BsArrowsFullscreen className='w-12 h-12 stroke-[1.5] ' />
											</div>
											<img
												src={
													`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com/${userInfo?.students_Dec}` ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
												}
												className='w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg aspect-video'
											/>
										</div>
									</DialogTrigger>
									<DialogTrigger
										onClick={(e) => {
											setDialogImage(
												`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com/${userInfo?.faculty_Rec}`
											)
											setModalPopped(
												`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com/${userInfo?.faculty_Rec}` ||
												'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
											)
										}}
										className='flex flex-col items-start justify-center space-y-2 basis-[60%] w-full '
									>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Faculty Rec
										</p>
										<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg '>
											<div className='absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 '>
												<BsArrowsFullscreen className='w-12 h-12 stroke-[1.5] ' />
											</div>
											<img
												src={
													`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com/${userInfo?.faculty_Rec}` ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
												}
												className='w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg aspect-video'
											/>
										</div>
									</DialogTrigger>
								</div>
								<div className='w-full flex items-center justify-between space-x-6  '>
									<div className='flex flex-col items-start justify-center space-y-2  w-full '>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Approved Reason
										</p>
										<p className=' font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200  h-auto bg-green-100/20  resize-none focus:outline-[#74c69d]  h-auto '>
											{userInfo?.purpose}
										</p>
									</div>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6 '>
									<div className='flex flex-col items-start justify-center space-y-2  w-full '>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Requested On
										</p>
										<p className='truncate font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200  h-auto bg-green-100/20  resize-none focus:outline-[#74c69d] '>
											{formatTimeDifference(userInfo?.createdAt)}
										</p>
									</div>
									<div className='flex flex-col items-start justify-center space-y-2  w-full '>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Approved On
										</p>
										<p className='truncate font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200  h-auto bg-green-100/20  resize-none focus:outline-[#74c69d] '>
											{formatTimeDifference(userInfo?.updatedAt)}
										</p>
									</div>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6 '>
									<div className='flex flex-col items-start justify-center space-y-2  w-full '>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											EWS
										</p>
										<p className='truncate font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200  h-auto bg-green-100/20  resize-none focus:outline-[#74c69d] '>
											{userInfo?.ews ? 'Yes' : 'No'}
										</p>
									</div>
									<div className='flex flex-col items-start justify-center space-y-2  w-full '>
										<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Family Problem
										</p>
										<p className='truncate font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-neutral-200  h-auto bg-green-100/20  resize-none focus:outline-[#74c69d] '>
											{userInfo?.family_status ? 'Yes' : 'No'}
										</p>
									</div>
								</div>
							</div>

							{/* <div className='w-full flex items-center justify-between space-x-6  '>
								<div className='flex flex-col items-start justify-center space-y-2  w-full '>
									<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
										Reason
									</p>
									<textarea
										ref={textAreaRef}
										rows={3}
										id='review-text'
										onChange={handleChange}
										value={form?.reason}
										disabled={loading}
										className='font-medium outline-green-prim-1 text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 w-full bg-neutral-200 h-auto  resize-none focus:outline-[#74c69d] '
									>
										Yasier Zahir Ansari
									</textarea>
									{errors.reason && (
										<p className='text-[#db3100] text-start text-xs sm:text-sm ml-2 font-normal  '>
											{errors.reason}
										</p>
									)}
								</div>
							</div> */}
							{/* <div className="w-full flex items-center justify-between space-x-6  " >
                            <div className="flex flex-col items-start justify-center space-y-2 w-full">
                                <p className="bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white">
                                    Issued On
                                </p>
                                <div className="relative w-full">
                                    <input
                                        type="date"
                                        // min={minDate}
                                        className="w-full font-bold text-lg pl-4 rounded-lg py-2 px-3 border-2 bg-green-100/20 border-zinc-300 resize-none focus:outline-[#74c69d] appearance-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-center space-y-2  w-full " >
                                <p className="bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white" >Expected Return Date</p>
                                <input type="date"
                                    // max={maxDate}
                                    className=" font-bold text-lg pl-4 rounded-lg py-2 px-3 border-2 w-full h-auto bg-green-100/20 border-zinc-300 resize-none focus:outline-[#74c69d] " />
                            </div>
                        </div> */}
							<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-6  '>
								<div className='flex flex-col items-start justify-center space-y-2 w-full'>
									<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
										Duration
									</p>
									<select
										disabled={loading}
										name='duration'
										required={true}
										value={form?.duration}
										onChange={(e) =>
											setForm({ ...form, duration: e.target.value })
										}
										className='  w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-neutral-200 focus:outline-green-prim-1 placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3 text-[0.8rem] sm:text-base md:text-lg pl-4  py-2 px-3 sm:px-4 md bg-green-100/20 border-zinc-300 resize-none   '
									>
										<option value='' disabled hidden>
											Select Duration
										</option>
										{dur_options?.map((el) => (
											<option value={el?.value} key={el?.idx}>
												{el?.text}
											</option>
										))}
									</select>
									<p className='text-[#db3100] text-start text-xs sm:text-sm ml-2 font-normal  '>
										{errors.duration || '‎'}
									</p>
								</div>
								<div className='flex flex-col items-start justify-center space-y-2  w-full '>
									<p className='bg-green-prim-1 rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
										Issued Laptop
									</p>
									<select
										disabled={loading}
										name='duration'
										required={true}
										value={form?.laptop_id}
										onChange={(e) =>
											setForm({ ...form, laptop_id: e.target.value })
										}
										className=' w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-neutral-200 focus:outline-green-prim-1 placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3 text-[0.8rem] sm:text-base md:text-lg pl-4  py-2 px-3 sm:px-4 md bg-green-100/20 border-zinc-300 resize-none   '
									>
										<option value='' disabled hidden>
											Select Laptop
										</option>
										{laptopOpt?.map((el) => (
											<option
												className='flex items-center justify-center py-4 my-4 px-2 bg-neutral-200 hover:bg-green-100'
												value={el?.laptop_id}
												key={el?._id}
											>
												<div className='flex items-center justify-center py-4 my-4 px-2 bg-neutral-200 hover:bg-green-100'>
													<span>{el?.laptop_id}</span>
													{/* <span
													className={`${
														el?.condition === 'Poor'
															? 'bg-red-200'
															: el?.condition === 'Good'
															? 'bg-yellow-200'
															: 'bg-lime-300'
													} px-2 py-1 rounded-sm `}
												>
													{el?.condition}
												</span> */}
												</div>
											</option>
										))}
									</select>
									<p className='text-[#db3100] text-start text-xs sm:text-sm ml-2 font-normal  '>
										{errors.laptop_id || '‎'}
									</p>
								</div>
							</div>
							<div className=' w-full flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-white sm:space-x-8 md:space-x-12 mx-auto max-w-2xl  '>
								<button
									onClick={(e) => {
										SubmitHandler(e, 'Accept')
									}}
									className='flex flex-col items-start justify-center space-y-2  w-full '
								>
									<div className='font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-gradient-to-tr from-[#52b788] hover:scale-110 transition-all duration-300 ease-linear to-green-prim-1  '>
										{loading ? (
											<div className='flex items-center space-x-3 justify-center rounded-lg'>
												<p>Loading</p>
												<div className='animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-[2.2px] border-r-none border-r-white border-transparent'></div>
											</div>
										) : (
											'Accept'
										)}
									</div>
								</button>
								<button
									onClick={(e) => {
										SubmitHandler(e, 'Reject')
									}}
									className='flex items-start justify-center space-y-2 flex-col  w-full '
								>
									<div className='font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-gradient-to-tr from-red-400 hover:scale-110 transition-all duration-300 ease-linear to-[#db3100]  '>
										{loading ? (
											<div className='flex items-center space-x-3 justify-center rounded-lg'>
												<p>Loading</p>
												<div className='animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-[2.2px] border-r-none border-r-white border-transparent'></div>
											</div>
										) : (
											'Reject'
										)}
									</div>
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
						<div className='animate-spin rounded-full h-4 w-4 border-[2.2px] border-r-none border-r-white border-green-prim-1'></div>
					</div>
				</div>
			)}
		</MaxWidthWrapper>
	)
}

export default MaintUserApprovalComp
