import React, { useContext, useEffect, useRef, useState } from 'react'
import { LuFolderEdit, LuInfo, LuUserCircle2 } from 'react-icons/lu'
import { AuthContext } from '../context/AuthContext'
import { BsArrowsFullscreen } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { IoWarningOutline } from 'react-icons/io5'
const UserProfile = () => {
	const [loading, setLoading] = useState(false)
	const [flag, setFlag] = useState(true)
	const { setModalPopped, user, token, setUser, setLoginData } =
		useContext(AuthContext)
	const [request, setRequest] = useState(null)
	const [selectedImage, setSelectedImage] = useState()
	const navigate = useNavigate()
	const dept_options = [
		'CSE (AI - ML)',
		'CSE (IOT - BT)',
		'COMPS',
		'IT',
		'Electrical',
		'Mechanical',
		'Civil',
		'AutoMobile'
	]
	const sem_options = [
		'I',
		'II',
		'III',
		'IV',
		'V',
		'VI',
		'VII',
		'VIII'
	]
	const year_options = ['FE', 'SE', 'TE', 'BE']
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
	const [form, setForm] = useState({
		fullname: user?.fullname || '',
		domain_id: user?.domain_id || '',
		prn: user?.prn || '',
		// password: user?.password || '',
		department: user?.department || '',
		year: user?.year || '',
		sem: user?.sem || ''
		// number: user?.number || ''
		// idCard: user?.idCard || ''
	})
	const [errors, setErrors] = useState({
		fullname: '',
		domain_id: '',
		prn: '',
		// password: '',
		department: '',
		year: '',
		sem: ''
		// number: ''
		// idCard: ''
	})
	const validateForm = () => {
		let valid = true
		const newErrors = { ...errors }

		if (!form.fullname) {
			newErrors.fullname = 'Name is required'
			valid = false
		}

		if (!form.domain_id) {
			newErrors.domain_id = 'Email is required'
			valid = false
		} else if (
			!/^[a-zA-Z0-9._%+-]+@mhssce\.ac\.in$/.test(form.domain_id)
		) {
			newErrors.domain_id = 'College Domain Email required'
			valid = false
		}
		if (!form.prn) {
			newErrors.prn = 'PRN is required'
			valid = false
		} else if (!/^[0-9]{6}$/.test(form.prn)) {
			newErrors.prn = 'PRN contains 20 numeric value'
			valid = false
		}

		// const fileSize = form?.idCard?.size / 1024
		// const allowedSize = 1024
		// if (!form?.idCard) {
		// 	newErrors.idCard = 'ID card is mandatory'
		// 	valid = false
		// } else if (!form?.idCard.type !== 'image/jpeg') {
		// 	newErrors.idCard = 'Image must be in JPEG/JPG format'
		// 	valid = false
		// } else if (fileSize > allowedSize) {
		// 	newErrors.idCard = 'Image size must be under 1MB'
		// 	valid = false
		// }

		if (!form?.department) {
			newErrors.department = 'Department is required'
			valid = false
		} else if (!dept_options.includes(form?.department)) {
			newErrors.department = 'Please select a valid department'
			valid = false
		}
		if (!form?.sem) {
			newErrors.sem = 'Sem is required'
			valid = false
		} else if (!sem_options.includes(form?.sem)) {
			newErrors.sem = 'Please Select a valid Sem'
			valid = false
		}
		if (!form?.year) {
			newErrors.year = 'Year is required'
			valid = false
		} else if (!year_options.includes(form?.year)) {
			newErrors.year = 'Please Select a valid Year'
			valid = false
		}
		setErrors(newErrors)
		return valid
	}
	const updateHelper = async (accessToken) => {
		var response
		setLoading(true)
		try {
			response = await axios({
				method: 'post',
				url: 'http://localhost:8000/api/v1/student/update-profile',
				data: form,
				headers: { Authorization: `Bearer ${accessToken}` }
			})
			const res = response?.data
			console.log(res)
			setUser(res?.data)
			setFlag(!flag)
			toast.success('Profile Updated Successfully')
			setLoading(false)
		} catch (e) {
			console.log(e)
			setLoading(false)
			if (e?.response?.status === 500) {
				toast.error(
					'Server Error Occurred, please try again after some time'
				)
			} else {
				toast.error(
					'Some Error Ocurred Please try again after some time'
				)
			}
		}
		setLoading(false)
	}
	const handleImageChange = (e) => {
		const file = e.target.files[0]
		setForm({ ...form, idCard: file })
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setSelectedImage(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}
	const SubmitHandler = async (e) => {
		e.preventDefault()
		if (validateForm()) {
			if (
				form?.fullname === user?.fullname &&
				form?.domain_id === user?.domain_id &&
				form?.department === user?.department &&
				form?.prn === user?.prn &&
				form?.year === user?.year &&
				form?.sem === user?.sem
			) {
				// toast.error('You need to change your info first')
				toast('No profile changes has been made yet ', {
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
			} else {
				await updateHelper(token)
			}
		}
	}
	useEffect(() => {
		setLoading(true)
		const getData = async () => {
			const fetchUserProfile = async (accessToken) => {
				try {
					const response = await fetch(
						'http://localhost:8000/api/v1/student/profile',
						{
							method: 'GET',
							credentials: 'include',
							headers: { Authorization: `Bearer ${accessToken}` }
						}
					)

					if (response.ok) {
						const userProfile = await response.json()
						// console.log(userProfile)
						setUser(userProfile?.data)
						setForm({ ...form, ...userProfile?.data })
					} else {
						setUser(null)
					}
				} catch (error) {
					console.error('Error fetching user profile:', error)
					setUser(null)
				}
			}
			const fetchRequests = async (id, accessToken) => {
				try {
					const response = await axios({
						method: 'get',
						url: `http://localhost:8000/api/v1/student/recent-request`,
						headers: { Authorization: `Bearer ${accessToken}` }
					})
					// console.log(response?.data?.data)
					setRequest(response?.data?.data)
				} catch (e) {
					// console.log(e)
					if (e?.response?.status === 400) {
						setRequest(null)
					} else if (e?.response?.status === 404) {
						setRequest(null)
					} else {
						toast.error(
							'Some Error Ocurred While fetching your previous request please try after some time'
						)
					}
				}
			}
			if (token) {
				await fetchUserProfile(token)
				await fetchRequests(user?._id, token)
			} else {
				navigate('/user/login')
			}
		}
		getData()
		setLoading(false)
	}, [token, flag])
	console.log(user)

	return (
		<>
			<div className='flex flex-col items-center justfiy-center max-w-4xl w-full h-full text-gray-800/90 mx-auto'>
				<div
					div
					className='flex items-center space-x-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl justify-center w-full h-full my-16  text-center mx-auto'
				>
					<LuUserCircle2 className=' text-[#40916c] -skew-x-6 ' />
					<h1 className='font-bold italic'>Profile</h1>
				</div>
			</div>
			<div
				className={`flex relative w-full items-center mx-auto flex-col space-y-4 max-w-3xl ${
					loading && 'opacity-50'
				} `}
			>
				<p className='mb-6 text-[0.8rem] sm:text-base md:text-lg text-gray-800/90 font-semibold '>
					These profile information would be attached to your laptop
					application, so please update them if needed. Once applied
					these updated change wont be included in the previous
					applications. College Id card are not updatable, If you need
					to update those, contact your Department Head.
				</p>
				<div className='w-full flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6  '>
					<div className='flex flex-col items-start justify-center space-y-2  w-full '>
						<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
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
				<div className='w-full flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6  '>
					<div className='flex items-start justify-center space-y-2 flex-col w-full '>
						<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
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
				<div className='w-full flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-3 '>
					<div className='flex  w-full sm:basis-[50%] items-start justify-center space-y-2 flex-col '>
						<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
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
						<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
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
				<div className='w-full flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-3 '>
					<div className='flex w-full sm:basis-[50%] items-start justify-center space-y-2 flex-col '>
						<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
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
						<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
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
				<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  '>
					<div className='flex flex-col items-start justify-center space-y-2 w-full '>
						<div className='flex items-start justify-start w-full h-full flex-col space-y-3 '>
							<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
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
											user?.idCard
											// ||
											// 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
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
								</label>
								{/* <input
									disabled={loading}
									id='image-input'
									type='file'
									accept='image/*'
									className='hidden'
									onChange={handleImageChange}
								/> */}
							</div>
							<p className='text-[#db3100] text-start text-[0.7rem] sm:text-xs ml-2 font-bold '>
								{errors?.idCard || '‎'}
							</p>
						</div>
					</div>
				</div>
				<div className='w-full flex items-center text-white justify-between space-x-12 mx-auto max-w-lg  '>
					<button
						onClick={SubmitHandler}
						disabled={loading}
						className='flex flex-col items-start justify-center space-y-2  w-full '
					>
						<p className='font-bold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-gradient-to-tr from-[#52b788] hover:scale-105 md:hover:scale-110 transition-all duration-300 ease-linear to-[#40916c]  '>
							{loading ? (
								<div className='flex items-center space-x-3 justify-center px-3 py-2 rounded-lg'>
									<p className='text-base md:text-lg '>Loading</p>
									<div className='animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-[2.2px] border-r-none border-r-white border-transparent'></div>
								</div>
							) : (
								'Update'
							)}
						</p>
					</button>
				</div>
			</div>
			<div
				className={`flex items-center w-full justify-center mx-auto flex-col space-y-12 max-w-6xl  pb-20 `}
			>
				{loading ? (
					<div className='flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl border-2  border-green-600/40 animate-pulse '>
						<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  '>
							<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full '>
								<p className='bg-[#40916c80] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white h-6 w-24 '></p>
								<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  h-12 '></p>
							</div>
							<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full '>
								<p className='bg-[#40916c80] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white h-6 w-24 '></p>
								<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  h-12 '></p>
							</div>
						</div>
						<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  '>
							<div className='flex flex-col items-start justify-center space-y-2 basis-1/4 w-full '>
								<p className='bg-[#40916c80] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white h-6 w-16 '></p>
								<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg '>
									<div className='w-full h-full bg-slate-100 aspect-video transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg' />
								</div>
							</div>
							<div className='flex flex-col items-start justify-center space-y-2 basis-1/4 w-full '>
								<p className='bg-[#40916c80] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white h-6 w-16 '></p>

								<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg '>
									<div className='w-full h-full bg-slate-100 aspect-video transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg' />
								</div>
							</div>
							<div className='flex flex-col items-start justify-center space-y-2 basis-1/4 w-full '>
								<p className='bg-[#40916c80] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white h-6 w-16 '></p>

								<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg '>
									<div className='w-full h-full bg-slate-100 aspect-video transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg' />
								</div>
							</div>
							<div className='flex flex-col items-start justify-center space-y-2 basis-1/4 w-full '>
								<p className='bg-[#40916c80] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white h-6 w-16 '></p>

								<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full relative overflow-hidden rounded-lg '>
									<div className='w-full h-full bg-slate-100 aspect-video transition-all duration-300 ease-linear group-hover:scale-110 object-cover rounded-lg' />
								</div>
							</div>
						</div>
						<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  '>
							<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full '>
								<p className='bg-[#40916c80] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white h-6 w-24 '></p>
								<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  h-12 '></p>
							</div>
							<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full '>
								<p className='bg-[#40916c80] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white h-6 w-24 '></p>
								<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  h-12 '></p>
							</div>
						</div>
						<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  '>
							<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full '>
								<p className='bg-[#40916c80] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white h-6 w-24 '></p>
								<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  h-12 '></p>
							</div>
							<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full '>
								<p className='bg-[#40916c80] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs font-bold text-white h-6 w-24 '></p>
								<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  h-12 '></p>
							</div>
						</div>
					</div>
				) : (
					<>
						{request?.request?.length > 0 ||
						request?.issue?.length > 0 ? (
							<>
								<div className='flex items-center justify-center w-full bg-stone-300 h-[2px] rounded-full mt-12 '></div>
								<div
									id='request-history'
									className='flex w-full h-full items-center justify-start mb-4 md:mb-6'
								>
									<h3 className=' min-w-fit font-bold text-[#2d6a4f] text-2xl md:text-3xl p-0 m-0 rounded-md md:self-start italic '>
										Recent Request
									</h3>
									<div className='w-full h-full bg-[#74c69d90] ml-6 p-1 rounded-sm'>
										‎
									</div>
								</div>
								{request?.issue ? (
									<>
										<div className='flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl border-2  border-green-600 relative '>
											<div
												className='absolute inset-0 left-[50%] translate-x-[-50%] w-full -top-5  z-10
'
											>
												<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full mx-auto '>
													<p className='p-2 sm:px-4 md:px-6  bg-gradient-to-br from-[#52b788] font-semibold  to-[#40916c] text-white rounded-xl mx-auto'>
														Issuance Fulfilled
													</p>
												</div>
											</div>
											<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  '>
												<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full '>
													<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
														Applied On
													</p>
													<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  '>
														{formatDate(
															request?.request[0]?.createdAt
														)}
													</p>
												</div>
												<div className='flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full '>
													<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
														Duration
													</p>
													<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  '>
														{request?.request[0]?.duration === 'Long'
															? 'Half Yearly'
															: request?.request[0]?.duration ===
															  'Medium'
															? '1-2 Month'
															: '1 Month'}{' '}
													</p>
												</div>
											</div>
											<div className='w-full flex flex-col md:flex-row items-center justify-between  mt-4 md:mt-6 space-y-4 md:space-y-0 md:space-x-6  '>
												<div className='flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full '>
													<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
														Approved On
													</p>
													<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  '>
														{request?.request[0]?.createdAt !==
														request?.request[0]?.updatedAt
															? formatDate(
																	request?.request[0]?.updatedAt
															  )
															: "Couldn't Fetch Date"}
													</p>
												</div>
												<div className='flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full '>
													<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
														Issued On
													</p>
													<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  '>
														{request?.issue?.createdAt
															? formatDate(request?.issue?.createdAt)
															: "Couldn't Fetch Date"}
													</p>
												</div>
											</div>
										</div>
									</>
								) : request?.request[0]?.status === 'Rejected' ? (
									<div className='flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl border-2  border-red-600 relative '>
										<div
											className='absolute inset-0 left-[50%] translate-x-[-50%] w-full -top-5  z-10
'
										>
											<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full mx-auto '>
												<p className='p-2 sm:px-4 md:px-6  bg-gradient-to-tr from-red-400 font-semibold  to-red-500 text-white rounded-xl mx-auto'>
													Approval Rejected
												</p>
											</div>
										</div>
										<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  '>
											<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full '>
												<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
													Applied On
												</p>
												<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  '>
													{formatDate(request?.request[0]?.createdAt)}
												</p>
											</div>
											<div className='flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full '>
												<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
													Duration
												</p>
												<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  '>
													{request?.request[0]?.duration === 'Long'
														? 'Half Yearly'
														: request?.request[0]?.duration ===
														  'Medium'
														? '1-2 Month'
														: '1 Month'}{' '}
												</p>
											</div>
										</div>
										<div className='w-full flex flex-col md:flex-row items-center justify-between mt-4 md:mt-6  space-y-4 md:space-y-0 md:space-x-6 mx-auto  '>
											<div className='flex items-start justify-center space-y-2 flex-col  w-full '>
												<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
													Rejected On
												</p>
												<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  '>
													{request?.request[0]?.createdAt !==
													request?.request[0]?.updatedAt
														? formatDate(
																request?.request[0]?.updatedAt
														  )
														: null}
												</p>
											</div>
										</div>
									</div>
								) : request?.request[0]?.status === 'Approved' ? (
									<div className='flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl border-2  border-sky-600 relative '>
										<div
											className='absolute inset-0 left-[50%] translate-x-[-50%] w-full -top-5  z-10
'
										>
											<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full mx-auto '>
												<p className='p-2 sm:px-4 md:px-6  bg-gradient-to-tr from-blue-400 font-semibold  to-blue-500 text-white rounded-xl mx-auto'>
													Issuance Pending
												</p>
											</div>
										</div>
										<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  '>
											<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full '>
												<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
													Applied On
												</p>
												<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  '>
													{formatDate(request?.request[0]?.createdAt)}
												</p>
											</div>
											<div className='flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full '>
												<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
													Duration
												</p>
												<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  '>
													{request?.request[0]?.duration === 'Long'
														? 'Half Yearly'
														: request?.request[0]?.duration ===
														  'Medium'
														? '1-2 Month'
														: '1 Month'}{' '}
												</p>
											</div>
										</div>
										<div className='w-full flex flex-col md:flex-row items-center justify-between mt-4 md:mt-6  space-y-4 md:space-y-0 md:space-x-6 mx-auto  '>
											<div className='flex items-start justify-center space-y-2 flex-col  w-full '>
												<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
													Approved On
												</p>
												<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  '>
													{request?.request[0]?.createdAt !==
													request?.request[0]?.updatedAt
														? formatDate(
																request?.request[0]?.updatedAt
														  )
														: null}
												</p>
											</div>
										</div>
									</div>
								) : (
									<div className='flex items-center justify-center flex-col w-full h-full p-4 sm:p-8 md:p-12 rounded-xl  border-2  border-orange-300 relative '>
										<div
											className='absolute inset-0 left-[50%] translate-x-[-50%] w-max -top-5  z-10
'
										>
											<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full mx-auto '>
												<p className=' w-full py-2 px-4 md:px-6 bg-gradient-to-tr  from-orange-400 font-medium to-orange-500 text-white rounded-xl mx-auto'>
													Approval Pending
												</p>
											</div>
										</div>
										<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6  '>
											<div className='flex flex-col items-start justify-center space-y-2 basis-[50%] w-full '>
												<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
													Applied On
												</p>
												<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  '>
													{formatDate(request?.request[0]?.createdAt)}
												</p>
											</div>
											<div className='flex items-start justify-center space-y-2 flex-col  basis-[50%] w-full '>
												<p className='bg-[#40916c] rounded-lg px-2 py-1 md:px-3 md:py-[5px] text-xs sm:text-sm font-medium text-white'>
													Duration
												</p>
												<p className='font-medium outline-[#40916c] text-[0.8rem] sm:text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6  w-full bg-stone-200  '>
													{request?.request[0]?.duration === 'Long'
														? 'Half Yearly'
														: request?.request[0]?.duration ===
														  'Medium'
														? '1-2 Month'
														: '1 Month'}
												</p>
											</div>
										</div>
									</div>
								)}
							</>
						) : (
							<>
								{/* <div className='flex items-center justify-center w-full bg-gray-400 h-[2px] rounded-full mt-12 '></div>

								<div className='flex w-full h-full items-center justify-start mb-4 md:mb-6'>
									<h3 className=' w-max font-bold text-[#2d6a4f] text-2xl md:text-3xl p-0 m-0 rounded-md md:self-start italic '>
										Requests
									</h3>
									<div className='w-full h-full bg-[#74c69d90] ml-6 p-1 rounded-sm'>
										‎
									</div>
								</div> */}
							</>
						)}
					</>
				)}
			</div>
		</>
	)
}

export default UserProfile
