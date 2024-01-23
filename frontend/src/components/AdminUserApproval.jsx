import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaRegHandPointDown } from 'react-icons/fa'
import { LuUserCircle2 } from 'react-icons/lu'
import { AuthContext } from '../context/AuthContext'
import { BsArrowsFullscreen } from 'react-icons/bs'
import useAutosizeTextArea from '../context/AutoResizer'
import { TbUserSquareRounded } from 'react-icons/tb'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
const AdminUserApprovalComp = ({ flag, id }) => {
	const {
		setModalPopped,
		userType,
		token,
		setUserInfo,
		user,
		userInfo,
		mainLoading
	} = useContext(AuthContext)
	const [form, setForm] = useState({ reason: '' })
	const [errors, setErrors] = useState({ reason: '' })
	const [userNotFound, setuserNotFound] = useState(false)
	const textAreaRef = useRef(null)
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)
	const { state } = useLocation()
	console.log(userInfo)
	useAutosizeTextArea(textAreaRef, form?.reason)
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
			valid = true
		}
		setErrors(newErrors)
		return valid
	}
	const SubmitHandler = async (e, text) => {
		setLoading(true)
		e.preventDefault()
		if (validateForm()) {
			await updateHelper(text)
		} else {
			console.log('give real ting')
		}
		setLoading(false)
	}
	const updateHelper = async (approve) => {
		var response
		try {
			response = await axios({
				method: 'post',
				url: `http://localhost:8000/api/v1/admin/update-request/${userInfo?._id}`,
				data: { update: approve, message: form?.reason },
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
			navigate('/admin/user')
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

	useEffect(() => {
		setLoading(true)
		const getUserInfo = async () => {
			if (user?.userType === 'admin') {
				var response
				try {
					response = await axios({
						method: 'get',
						url: `http://localhost:8000/api/v1/admin/request/${id}`,
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
			} else if (user?.userType === 'maintenance') {
				var response
				try {
					setLoading(true)
					response = await axios({
						method: 'get',
						url: `http://localhost:8000/api/v1/maintenance/request/${id}`,
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
					toast.error(
						"There's Already a student with your entered domain id"
					)
				}
			}
		}
		getUserInfo()
		setLoading(false)
	}, [])
	console.log(userInfo)

	return (
		<>
			{!mainLoading ? (
				!userNotFound ? (
					<>
						<div className='flex flex-col items-center justfiy-center max-w-4xl w-full h-full'>
							<div
								div
								className='flex items-center space-x-2 sm:space-x-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl  justify-center w-full h-full mt-12 mb-16'
							>
								<LuUserCircle2 className=' text-[#40916c] -skew-x-6 ' />
								<h1 className='font-bold  italic'>Application</h1>
							</div>
						</div>
						<div className='flex items-center w-full justify-center mx-auto flex-col space-y-4 sm:space-y-6 md:space-y-12 max-w-5xl  mb-20'>
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
										<p className='p-2 sm:px-4 md:px-6  bg-gradient-to-tr from-[#52b788] font-semibold  to-[#40916c] text-white rounded-xl mx-auto'>
											Request
										</p>
									</div>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6'>
									<div className='flex flex-col items-start justify-center space-y-2 basis-[60%] w-full'>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Name
										</p>
										<p className='truncate font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200'>
											{userInfo?.student_id?.fullname}
										</p>
									</div>
									<div className='flex items-start justify-center space-y-2 flex-col basis-[40%] w-full'>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Email
										</p>
										<p className='truncate font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200'>
											{userInfo?.student_id?.domain_id}
										</p>
									</div>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-3 '>
									<div className='flex w-full sm:basis-[50%] md:basis-[30%] items-start justify-center space-y-2 flex-col '>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Prn
										</p>
										<p className='  font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 '>
											{userInfo?.student_id?.prn}
										</p>
									</div>
									<div className='flex w-full sm:basis-[50%] md:basis-[30%] items-start justify-center space-y-2 flex-col '>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Dept
										</p>
										<p className=' font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 '>
											{userInfo?.student_id?.department}
										</p>
									</div>
									<div className='flex w-full sm:basis-[50%] md:basis-[20%] items-start justify-center space-y-2 flex-col '>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Year
										</p>
										<p className='  font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 '>
											{userInfo?.student_id?.year}
										</p>
									</div>
									<div className='flex w-full sm:basis-[50%] md:basis-[20%]  items-start justify-center space-y-2 flex-col '>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Sem
										</p>
										<p className=' font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 '>
											{userInfo?.student_id?.sem}
										</p>
									</div>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6  '>
									<button
										onClick={(e) => {
											setModalPopped(
												userInfo?.student_id?.idCard ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
											)
										}}
										className='flex flex-col items-start justify-center space-y-2 basis-[60%] w-full '
									>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Id Card
										</p>
										{/* <p className="font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 "  >Yasier Zahir Ansari</p> */}
										<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg '>
											<button className='absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 '>
												<BsArrowsFullscreen className='w-12 h-12 stroke-[1.5] ' />
											</button>
											<img
												src={
													userInfo?.student_id?.idCard ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
												}
												className='w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg'
												loading='lazy'
												alt='Refresh if no image is visible'
											/>
										</div>
									</button>
									<button
										onClick={(e) => {
											setModalPopped(
												userInfo?.student_id?.idCard ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
											)
										}}
										className='flex flex-col items-start justify-center space-y-2 basis-[60%] w-full '
									>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Pdc
										</p>
										{/* <p className="font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 "  >Yasier Zahir Ansari</p> */}
										<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg '>
											<button className='absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 '>
												<BsArrowsFullscreen className='w-12 h-12 stroke-[1.5] ' />
											</button>
											<img
												src={
													userInfo?.student_id?.idCard ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
												}
												className='w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg'
												loading='lazy'
												alt='Refresh if no image is visible'
											/>
										</div>
									</button>
								</div>
								<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6  '>
									<button
										onClick={(e) => {
											setModalPopped(
												userInfo?.student_id?.idCard ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
											)
										}}
										className='flex flex-col items-start justify-center space-y-2 basis-[60%] w-full '
									>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Parent Dec
										</p>
										{/* <p className="font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 "  >Yasier Zahir Ansari</p> */}
										<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg '>
											<button className='absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 '>
												<BsArrowsFullscreen className='w-12 h-12 stroke-[1.5] ' />
											</button>
											<img
												src={
													userInfo?.student_id?.idCard ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
												}
												className='w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg'
												loading='lazy'
												alt='Refresh if no image is visible'
											/>
										</div>
									</button>
									<button
										onClick={(e) => {
											setModalPopped(
												userInfo?.student_id?.idCard ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
											)
										}}
										className='flex flex-col items-start justify-center space-y-2 basis-[60%] w-full '
									>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Student Dec
										</p>
										{/* <p className="font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 "  >Yasier Zahir Ansari</p> */}
										<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg '>
											<button className='absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 '>
												<BsArrowsFullscreen className='w-12 h-12 stroke-[1.5] ' />
											</button>
											<img
												src={
													userInfo?.student_id?.idCard ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
												}
												className='w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg'
												loading='lazy'
												alt='Refresh if no image is visible'
											/>
										</div>
									</button>
									<button
										onClick={(e) => {
											setModalPopped(
												userInfo?.student_id?.idCard ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
											)
										}}
										className='flex flex-col items-start justify-center space-y-2 basis-[60%] w-full '
									>
										<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
											Faculty Rec
										</p>
										{/* <p className="font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200 "  >Yasier Zahir Ansari</p> */}
										<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg '>
											<button className='absolute w-full h-full hidden group-hover:bg-black/70 rounded-lg group-hover:flex items-center justify-center text-white z-20 '>
												<BsArrowsFullscreen className='w-12 h-12 stroke-[1.5] ' />
											</button>
											<img
												src={
													userInfo?.student_id?.idCard ||
													'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
												}
												className='w-full h-full transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg'
												loading='lazy'
												alt='Refresh if no image is visible'
											/>
										</div>
									</button>
								</div>
							</div>
							<div className='w-full flex items-center justify-between space-x-6  '>
								<div className='flex flex-col items-start justify-center space-y-2  w-full '>
									<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
										Reason
									</p>
									<textarea
										ref={textAreaRef}
										rows={3}
										id='review-text'
										onChange={handleChange}
										value={form?.reason}
										disabled={loading}
										className='  font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 w-full bg-stone-200 h-auto  resize-none focus:outline-[#74c69d] '
									></textarea>
									<p className='text-[#db3100] text-start text-xs sm:text-sm ml-2 font-normal '>
										{errors.reason || '‎'}
									</p>
								</div>
							</div>
							<div className='w-full flex items-center text-white justify-between space-x-6 sm:space-x-8 md:space-x-12 mx-auto max-w-2xl  '>
								<button
									disabled={loading}
									onClick={(e) => {
										SubmitHandler(e, 'Approved')
									}}
									className='flex flex-col items-start justify-center space-y-2  w-full '
								>
									<div className='font-bold text-sm sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-gradient-to-tr from-[#52b788] hover:scale-110 transition-all duration-300 ease-linear to-[#40916c]  '>
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
									disabled={loading}
									onClick={(e) => {
										SubmitHandler(e, 'Rejected')
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
							<TbUserSquareRounded className=' text-[#52b788] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 -ml-1 sm:-ml-2 md:-ml-3  ' />
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
		</>
	)
}

export default AdminUserApprovalComp
