import React, { useContext, useEffect, useRef, useState } from 'react'
import {
	LuFolderEdit,
	LuFileBarChart,
	LuPackage
} from 'react-icons/lu'
import { AuthContext } from '../context/AuthContext'
import { HiOutlineDocumentText } from 'react-icons/hi2'
import axios from 'axios'
import useAutosizeTextArea from '../context/AutoResizer'
import { IoWarningOutline } from 'react-icons/io5'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import MaxWidthWrapper from './MaxWidthWrapper'

const API = axios.create({ baseURL: 'http://localhost:5173' })

const UserApplicationComp = () => {
	const { user, mainLoading, token } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)

	const dur_options = [
		{ value: 'Short', text: '2-4 Weeks', id: 1 },
		{ value: 'Medium', text: '1-2 Months', id: 2 },
		{ value: 'Long', text: ' Whole Semester', id: 3 }
	]
	const [form, setForm] = useState({
		parents_Dec: '',
		students_Dec: '',
		faculty_Rec: '',
		pdc: '',
		purpose: '',
		duration: '',
		ews: '',
		family_status: ''
	})
	const [errors, setErrors] = useState({
		parents_Dec: '',
		students_Dec: '',
		faculty_Rec: '',
		pdc: '',
		purpose: '',
		duration: '',
		ews: '',
		family_status: ''
	})
	const textAreaRef = useRef()
	useAutosizeTextArea(textAreaRef, form?.message)
	const navigate = useNavigate()
	const handleChange = (e) => {
		const val = e.target?.value
		setForm({ ...form, message: val })
		console.log(form)
	}
	const validateForm = () => {
		let valid = true
		const newErrors = { ...errors }
		const fileSize1 = form?.parents_Dec.size / 1024
		const fileSize2 = form?.students_Dec.size / 1024
		const fileSize3 = form?.faculty_Rec.size / 1024
		const fileSize4 = form?.pdc.size / 1024

		const allowedSize = 1024
		if (!form?.parents_Dec) {
			newErrors.parents_Dec = 'Parent Decleration is required'
			valid = false
		} else if (fileSize1 > allowedSize) {
			newErrors.parents_Dec = 'Image size must be under 1MB'
			valid = false
		} else if (
			form?.parents_Dec.type !== 'image/jpeg' &&
			form?.parents_Dec.type !== 'image/jpg'
		) {
			newErrors.parents_Dec = 'Image must be in JPEG/JPG format'
			valid = false
		} else {
			newErrors.parents_Dec = ''
		}

		if (!form?.students_Dec) {
			newErrors.students_Dec = 'Self Decleration is required'
			valid = false
		} else if (fileSize2 > allowedSize) {
			newErrors.students_Dec = 'Image size must be under 1MB'
			valid = false
		} else if (
			form?.students_Dec.type !== 'image/jpeg' &&
			form?.students_Dec.type !== 'image/jpg'
		) {
			newErrors.students_Dec = 'Image must be in JPEG/JPG format'
			valid = false
		} else {
			newErrors.students_Dec = ''
		}

		if (!form?.faculty_Rec) {
			newErrors.faculty_Rec = 'Faculty Recommendation is required'
			valid = false
		} else if (fileSize3 > allowedSize) {
			newErrors.faculty_Rec = 'Image size must be under 1MB'
			valid = false
		} else if (
			form?.faculty_Rec.type !== 'image/jpeg' &&
			form?.faculty_Rec.type !== 'image/jpg'
		) {
			newErrors.faculty_Rec = 'Image must be in JPEG/JPG format'
			valid = false
		} else {
			newErrors.faculty_Rec = ''
		}

		if (!form?.pdc) {
			newErrors.pdc = 'Post Dated Cheque is required'
			valid = false
		} else if (fileSize4 > allowedSize) {
			newErrors.pdc = 'Image size must be under 1MB'
			valid = false
		} else if (
			form?.pdc.type !== 'image/jpeg' &&
			form?.pdc.type !== 'image/jpg'
		) {
			newErrors.pdc = 'Image must be in JPEG/JPG format'
			valid = false
		} else {
			newErrors.pdc = ''
		}

		if (!form?.purpose) {
			newErrors.purpose = 'Purpose is required'
			valid = false
		} else if (form?.purpose?.length > 100) {
			newErrors.purpose = 'Exceeds 100 character'
			valid = false
		} else {
			newErrors.purpose = ''
		}

		if (!form?.duration) {
			newErrors.duration = 'Duration is required'
			valid = false
		} else if (
			!dur_options.some((option) => option.value === form?.duration)
		) {
			newErrors.duration = 'Enter Valid Duration '
			valid = false
		} else {
			newErrors.duration = ''
		}

		if (!form?.ews) {
			newErrors.ews = 'EWS is required'
			valid = false
		} else if (form?.ews !== 'no' && form?.ews !== 'yes') {
			newErrors.ews = 'Enter valid choice '
			valid = false
		} else {
			newErrors.ews = ''
		}

		if (!form?.family_status) {
			newErrors.family_status = 'Family status is required'
			valid = false
		} else if (
			form?.family_status !== 'no' &&
			form?.family_status !== 'yes'
		) {
			newErrors.family_status = 'Enter valid choice '
			valid = false
		} else {
			newErrors.family_status = ''
		}

		setErrors(newErrors)
		return valid
	}
	const [selectedImage1, setSelectedImage1] = useState()
	const [selectedImage2, setSelectedImage2] = useState()
	const [selectedImage3, setSelectedImage3] = useState()
	const [selectedImage4, setSelectedImage4] = useState()

	const handleImageChange1 = (e) => {
		const file = e.target.files[0]
		setForm({ ...form, parents_Dec: file })
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setSelectedImage1(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}
	const handleImageChange2 = (e) => {
		const file = e.target.files[0]
		setForm({ ...form, students_Dec: file })
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setSelectedImage2(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}
	const handleImageChange3 = (e) => {
		const file = e.target.files[0]
		setForm({ ...form, faculty_Rec: file })
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setSelectedImage3(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}
	const handleImageChange4 = (e) => {
		const file = e.target.files[0]
		setForm({ ...form, pdc: file })
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setSelectedImage4(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}
	const applicationHelper = async () => {
		const formData = new FormData()
		formData.append('parents_Dec', form?.parents_Dec)
		formData.append('students_Dec', form?.students_Dec)
		formData.append('faculty_Rec', form?.faculty_Rec)
		formData.append('pdc', form?.pdc)
		formData.append('purpose', form?.purpose)
		formData.append('duration', form?.duration)
		formData.append('ews', form?.ews)
		formData.append('family_status', form?.family_status)
		formData.append('prn', user?.prn)
		formData.append('fullname', user?.fullname)
		formData.append('id', user?._id)
		var response
		try {
			response = await axios({
				method: 'post',
				url: `${
					import.meta.env.VITE_REACT_BACKEND_PORT_URL
				}/api/v1/student/new-request`,
				data: formData,
				withCredentials: true,
				header: {
					Authorization: `Bearer ${token}`,
					'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
				}
			})
			console.log(response?.status, 'here')
			const res = response.data
			toast.success('Application Sent to DLRC Successfully')
			navigate('/user/profile#request-history')
		} catch (e) {
			setLoading(false)
			if (e?.response?.status === 402) {
				setErrors({
					parents_Dec: '',
					students_Dec: '',
					faculty_Rec: '',
					pdc: '',
					purpose: '',
					duration: '',
					ews: '',
					family_status: ''
				})
				toast.error(
					'You Already have a pending Application,please be patient while we review your application'
				)
			} else if (e?.response?.status === 401) {
				setErrors({
					parents_Dec: '',
					students_Dec: '',
					faculty_Rec: '',
					pdc: '',
					purpose: '',
					duration: '',
					ews: '',
					family_status: ''
				})
				toast.error(
					"Your Files couldn't be saved in the database, please try after some time"
				)
			} else if (e?.response?.status === 408) {
				setErrors({
					parents_Dec: '',
					students_Dec: '',
					faculty_Rec: '',
					pdc: '',
					purpose: '',
					duration: '',
					ews: '',
					family_status: ''
				})
				toast.error(
					"Your Request couldn't be saved in the database, please try after some time"
				)
			} else {
				toast.error(
					'Some Error Ocurred Please Register after some time'
				)
			}
		}
	}
	console.log(user)
	const handleSubmit = async (e) => {
		setLoading(true)
		e.preventDefault()
		if (user?.appliedCurrent === true) {
			// toast.success(
			// 	'Your previous application is pending, apply after the status has been changed'
			// )
			toast(
				'Your previous application is pending, apply after the status has been changed',
				{
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
				}
			)
		} else if (validateForm()) {
			await applicationHelper()
		} else {
			toast(
				'Please carefully fill each prop with correct Information',
				{
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
				}
			)
		}
		setLoading(false)
	}
	return (
		<MaxWidthWrapper className='w-full h-full items-center justify-center mx-auto max-w-6xl text-gray-800/90 py-6 flex grow px-8 md:px-12 lg:px-20 xl:px-24 flex-col'>
			<div className='flex flex-col items-center justfiy-center max-w-4xl w-full h-full text-gray-800/90 mx-auto'>
				<div
					div
					className='flex items-center space-x-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl justify-center w-full h-full mt-6 sm:mt-10 md:mt-12 mb-8 text-center mx-auto'
				>
					<HiOutlineDocumentText className=' text-[#40916c] -skew-x-6 ' />
					<h1 className='font-semibold italic '>Application</h1>
				</div>
			</div>
			<form
				className={`flex relative w-full items-center mx-auto flex-col space-y-2 sm:space-y-4 max-w-4xl ${
					loading && 'opacity-50'
				}  pb-20`}
			>
				<p className=' mb-10 text-[0.8rem] sm:text-base md:text-lg text-gray-800/90 font-semibold  '>
					To borrow a laptop, you are required to fill the given
					application. Take heed that we will fetch your details from
					your profile and the form below to issue your laptop. If you
					wish, you can update your profile{' '}
					<a
						href='/user/profile'
						className='underline decoration-green-400 underline-offset-4 text-green-500'
					>
						here
					</a>{' '}
					. You can see the status of your application in your{' '}
					<a
						href='/user/profile'
						className='underline decoration-green-400 underline-offset-4 text-green-500'
					>
						profile
					</a>
				</p>
				<div className='flex flex-col items-center w-full justify-center mx-auto space-y-4 sm-space-y-6 md-space-y-8 lg-space-y-12 max-w-5xl p-10 border-[3px] border-[#40916c80] rounded-xl relative  '>
					<div
						className='absolute inset-0 left-[50%] translate-x-[-50%] -top-4 w-max z-10
'
					>
						<div className='flex items-center justify-center mx-auto px-3 py-1 md-py-2 rounded-lg bg-[#40916c] text-white font-semibold '>
							Your Info
						</div>
					</div>
					<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6 cursor-not-allowed select-none text-[0.6rem] opacity-70  '>
						<div className='flex flex-col items-start justify-center space-y-2 basis-[60%] w-full '>
							<p className='bg-[#40916c75]  rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
								Name
							</p>
							<p className='font-medium text-sm md:text-base  pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300 '>
								{user?.fullname}
							</p>
						</div>
						<div className='flex items-start justify-center space-y-2 flex-col  basis-[40%] w-full '>
							<p className='bg-[#40916c75]  rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
								Email
							</p>
							<p className='font-medium text-sm md:text-base  pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300   '>
								{user?.domain_id}
							</p>
						</div>
					</div>
					<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6 cursor-not-allowed select-none text-[0.6rem] opacity-70  '>
						<div className='flex w-full sm:basis-[50%] md:basis-[30%] items-start justify-center space-y-2 flex-col '>
							<p className='bg-[#40916c75]  rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
								Prn
							</p>
							<p className='  text-xs md:text-sm font-bold  pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300   '>
								{user?.prn}
							</p>
						</div>
						<div className='flex w-full sm:basis-[50%] md:basis-[30%] items-start justify-center space-y-2 flex-col '>
							<p className='bg-[#40916c75]  rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
								Dept
							</p>
							<p className=' font-medium text-sm md:text-base  pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300   '>
								{user?.department || '-'}{' '}
							</p>
						</div>
						<div className='flex w-full sm:basis-[50%] md:basis-[20%] items-start justify-center space-y-2 flex-col '>
							<p className='bg-[#40916c75]  rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
								Year
							</p>
							<p className='  text-xs md:text-sm font-bold pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300   '>
								{user?.year || '-'}{' '}
							</p>
						</div>
						<div className='flex w-full sm:basis-[50%] md:basis-[20%]  items-start justify-center space-y-2 flex-col '>
							<p className='bg-[#40916c75]  rounded-md sm:rounded-lg px-2 py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start text-xs sm:text-sm font-medium text-white'>
								Sem
							</p>
							<p className=' font-medium text-sm md:text-base  pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-green-100/20 border-zinc-300   '>
								{user?.sem || '-'}{' '}
							</p>
						</div>
					</div>
				</div>
				{/* {user?.applicationStatus ? (
					<div className='flex flex-col items-center w-full justify-center mx-auto space-y-4 sm-space-y-6 md-space-y-8 lg-space-y-12 max-w-5xl p-10 border-[3px] border-[#40916c80] rounded-xl relative  '>
						<div
							className='absolute inset-0 left-[50%] translate-x-[-50%] -top-4 w-max z-10
'
						>
							<div className='flex items-center justify-center mx-auto px-3 py-1 md-py-2 rounded-lg bg-[#40916c] text-white font-semibold '>
								Your Application
							</div>
						</div>
						<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6 cursor-not-allowed select-none text-[0.6rem] opacity-70  '>
							<p className='text-[0.8rem] sm:text-base md:text-lg font-semibold'>
								Your previous Application is currently under scrutiny,
								please wait until the Admins approve or reject your
								propsal. Until then you can check the status and
								history of your application in your profile pages
							</p>
						</div>
					</div>
				) : ( */}
				<>
					<div className='w-full pt-4 sm:pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 sm:space-y-6 md:space-y-0 md:space-x-6 mt-4 md:mt-0 '>
						<div className='flex flex-col items-start justify-center space-y-2 w-full '>
							<div className='flex items-start justify-start w-full h-full flex-col space-y-3 '>
								<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full rounded-lg'>
									<label
										htmlFor='image-input1'
										className=' relative cursor-pointer'
									>
										<p className=' text-xs md:text-sm font-medium rounded-md sm:rounded-lg bg-[#40916c] p-1 w-max  px-2 text-white mb-2  md:rounded-lg  py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start  '>
											Parent Decleration
										</p>
										<img
											src={
												selectedImage1
													? selectedImage1
													: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
											}
											alt='Selected Image'
											className='w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl object-contain aspect-video '
											width={100}
											height={100}
											loading='lazy'
										/>
										<div className='absolute top-7 md:top-10 right-0 bg-[#74c69d] rounded-lg sm:rounded-xl md:rounded-2xl p-2 md:p-3 '>
											<LuFolderEdit className='w-5 h-5 sm:h-6 sm:w-6 md:h-7 md:w-7' />
										</div>
									</label>
									<input
										disabled={loading}
										id='image-input1'
										type='file'
										accept='image/*'
										className='hidden'
										name='Parents_Dec'
										onChange={handleImageChange1}
									/>
								</div>
								<p className='text-red-400 text-start text-sm md:text-base ml-2 font-normal '>
									{errors.parents_Dec || '‎'}
								</p>
							</div>
						</div>
						<div className='flex flex-col items-start justify-center space-y-2 w-full '>
							<div className='flex items-start justify-start w-full h-full flex-col space-y-3 '>
								<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full rounded-lg'>
									<label
										htmlFor='image-input2'
										className=' relative cursor-pointer'
									>
										<p className='text-xs md:text-sm font-medium rounded-md sm:rounded-lg bg-[#40916c] p-1 w-max  px-2 text-white mb-2  md:rounded-lg  py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start '>
											Student Decleration
										</p>
										<img
											src={
												selectedImage2
													? selectedImage2
													: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
											}
											alt='Selected Image'
											className='w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl object-contain aspect-video '
											width={100}
											height={100}
											loading='lazy'
										/>
										<div className='absolute top-7 md:top-10 right-0 bg-[#74c69d] rounded-lg sm:rounded-xl md:rounded-2xl p-2 md:p-3 '>
											<LuFolderEdit className='w-5 h-5 sm:h-6 sm:w-6 md:h-7 md:w-7' />
										</div>
									</label>
									<input
										disabled={loading}
										id='image-input2'
										type='file'
										accept='image/*'
										className='hidden'
										name='students_Dec'
										onChange={handleImageChange2}
									/>
								</div>
								<p className='text-red-400 text-start text-sm md:text-base ml-2 font-normal '>
									{errors.students_Dec || '‎'}
								</p>
							</div>
						</div>
					</div>
					<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-4 sm:space-y-6 md:space-y-0 md:space-x-6  '>
						<div className='flex flex-col items-start justify-center space-y-2 w-full '>
							<div className='flex items-start justify-start w-full h-full flex-col space-y-3 '>
								<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full rounded-lg'>
									<label
										htmlFor='image-input3'
										className=' relative cursor-pointer'
									>
										<p className='text-xs md:text-sm font-medium rounded-md sm:rounded-lg bg-[#40916c] p-1 w-max  px-2 text-white mb-2  md:rounded-lg  py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start '>
											Faculty Recommendation
										</p>
										<img
											src={
												selectedImage3
													? selectedImage3
													: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
											}
											alt='Selected Image'
											className='w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl object-contain aspect-video '
											width={100}
											height={100}
											loading='lazy'
										/>
										<div className='absolute top-7 md:top-10 right-0 bg-[#74c69d] rounded-lg sm:rounded-xl md:rounded-2xl p-2 md:p-3 '>
											<LuFolderEdit className='w-5 h-5 sm:h-6 sm:w-6 md:h-7 md:w-7' />
										</div>
									</label>
									<input
										disabled={loading}
										id='image-input3'
										type='file'
										accept='image/*'
										className='hidden'
										name='faculty_Rec'
										onChange={handleImageChange3}
									/>
								</div>
								<p className='text-red-400 text-start text-sm md:text-base ml-2 font-normal '>
									{errors.faculty_Rec || '‎'}
								</p>
							</div>
						</div>
						<div className='flex flex-col items-start justify-center space-y-2 w-full '>
							<div className='flex items-start justify-start w-full h-full flex-col space-y-3 '>
								<div className='flex items-center justify-center group transition-all duration-300 ease-in-out  w-full h-full rounded-lg'>
									<label
										htmlFor='image-input4'
										className=' relative cursor-pointer'
									>
										<p className='text-xs md:text-sm font-medium rounded-md sm:rounded-lg bg-[#40916c] p-1 w-max  px-2 text-white mb-2  md:rounded-lg  py-0.5 sm:py-1 md:px-3 md:py-[5px] text-start '>
											Post Dated Cheque
										</p>
										<img
											src={
												selectedImage4
													? selectedImage4
													: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
											}
											alt='Selected Image'
											className='w-full h-full rounded-lg sm:rounded-xl md:rounded-2xl object-contain aspect-video '
											width={100}
											height={100}
											loading='lazy'
										/>
										<div className='absolute top-7 md:top-10 right-0 bg-[#74c69d] rounded-lg sm:rounded-xl md:rounded-2xl p-2 md:p-3 '>
											<LuFolderEdit className='w-5 h-5 sm:h-6 sm:w-6 md:h-7 md:w-7' />
										</div>
									</label>
									<input
										disabled={loading}
										id='image-input4'
										type='file'
										accept='image/*'
										className='hidden'
										name='fourth'
										onChange={handleImageChange4}
									/>
								</div>
								<p className='text-red-400 text-start text-sm md:text-base ml-2 font-normal '>
									{errors.pdc || '‎'}
								</p>
							</div>
						</div>
					</div>
					<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-2 sm:space-y-4 md:space-y-0 md:space-x-6  '>
						<div className='flex w-full sm:basis-[50%] items-start justify-center space-y-2 flex-col '>
							<p className='text-xs md:text-sm font-medium rounded-lg bg-[#40916c] p-1 w-max  px-2 text-white -mb-1  sm:rounded-lg  py-0.5 sm:py-1 md:px-3  text-start '>
								Purpose
							</p>
							<p className='text-gray-500 font-medium text-sm'>
								purpose of application - {100 - form?.purpose?.length}{' '}
								characters remaining
							</p>
							<input
								disabled={loading}
								type='text'
								name='purpose'
								value={form?.purpose}
								onChange={(e) =>
									e.target.value?.length < 101 &&
									setForm({ ...form, purpose: e.target.value })
								}
								className='  text-sm md:text-base font-medium  pl-4 rounded-lg py-2 px-3  border-2 w-full bg-green-100/20 border-zinc-300 lg:px-4 h-10 bg-stone-200 focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800  p-2 md:px-3 '
							/>
							<p className='text-red-400 text-start text-sm md:text-base ml-2 font-normal '>
								{errors.purpose || '‎'}
							</p>
						</div>
						<div className='flex w-full sm:basis-[50%] items-start justify-center space-y-2 flex-col '>
							<p className='text-xs md:text-sm font-medium rounded-lg bg-[#40916c] p-1 w-max  px-2 text-white -mb-1  sm:rounded-lg  py-0.5 sm:py-1 md:px-3  text-start '>
								Duration
							</p>
							<p className='text-gray-500 font-medium text-sm'>
								Select the duration of lending
							</p>
							<select
								disabled={loading}
								name='duration'
								required={true}
								value={form?.duration}
								onChange={(e) =>
									setForm({ ...form, duration: e.target.value })
								}
								className='text-sm md:text-base font-medium  pl-4 rounded-lg py-2 px-3  border-2 w-full bg-green-100/20 border-zinc-300 lg:px-4 h-10 bg-stone-200 focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800  p-2 md:px-3  '
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
							<p className='text-red-400 text-start text-sm md:text-base ml-2 font-normal '>
								{errors.duration || '‎'}
							</p>
						</div>
					</div>
					<div className='w-full flex flex-col md:flex-row items-center justify-between space-y-2 sm:space-y-4 md:space-y-0 md:space-x-6  '>
						<div className='flex w-full sm:basis-[50%]  items-start justify-center space-y-2 flex-col '>
							<p className='text-xs md:text-sm font-medium rounded-lg bg-[#40916c] p-1 w-max  px-2 text-white -mb-1  sm:rounded-lg  py-0.5 sm:py-1 md:px-3  text-start '>
								EWS
							</p>
							<p className='text-gray-500 font-medium text-sm'>
								{' '}
								Do you have an authentic{' '}
								<a
									href='https://yojanasarkari.in/ews-certificate-maharashtra/'
									target='blank'
									rel='noreferrer'
									className='text-sky-700'
								>
									EWS
								</a>{' '}
								certificate ?
							</p>
							<select
								disabled={loading}
								name='duration'
								required={true}
								value={form?.ews}
								onChange={(e) => {
									setForm({ ...form, ews: e.target.value })
									console.log(form?.ews)
								}}
								className='text-sm md:text-base font-medium  pl-4 rounded-lg py-2 px-3  border-2 w-full bg-green-100/20 border-zinc-300 lg:px-4 h-10 bg-stone-200 focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800  p-2 md:px-3  '
							>
								<option key={1} value='no'>
									No
								</option>
								<option value='yes' key={2}>
									Yes
								</option>
							</select>
							<p className='text-red-400 text-start text-sm md:text-base ml-2 font-normal '>
								{errors.ews || '‎'}
							</p>
						</div>
						<div className='flex w-full sm:basis-[50%]   items-start justify-center space-y-2 flex-col '>
							<p className='text-xs md:text-sm font-medium rounded-lg bg-[#40916c] p-1 w-max  px-2 text-white -mb-1  sm:rounded-lg  py-0.5 sm:py-1 md:px-3  text-start '>
								Family Status
							</p>
							<p className='text-gray-500 font-medium text-sm'>
								Any of your guardians terminally ill or deceased?
							</p>
							<select
								disabled={loading}
								name='duration'
								required={true}
								value={form?.family_status}
								onChange={(e) => {
									setForm({
										...form,
										family_status: e.target.value
									})
									console.log(form?.family_status)
								}}
								className='text-sm md:text-base font-medium  pl-4 rounded-lg py-2 px-3  border-2 w-full bg-green-100/20 border-zinc-300 lg:px-4 h-10 bg-stone-200 focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800  p-2 md:px-3  '
							>
								<option key={1} value='no'>
									No
								</option>
								<option value='yes' key={2}>
									Yes
								</option>
							</select>
							<p className='text-red-400 text-start text-sm md:text-base ml-2 font-normal '>
								{errors.family_status || '‎'}
							</p>
						</div>
					</div>
					<div className='w-full flex items-center text-white justify-between space-x-12 mx-auto max-w-lg  '>
						<button
							onClick={handleSubmit}
							className='flex flex-col items-start justify-center space-y-2  w-full '
						>
							<div className='font-semibold text-base md:text-lg pl-4 rounded-lg py-2 px-3 sm:px-4 md:px-6 border-2 w-full bg-gradient-to-tr from-[#52b788] hover:scale-105 md:hover:scale-110 transition-all duration-300 ease-linear to-[#40916c]  '>
								{loading ? (
									<div className='flex items-center space-x-3 justify-center rounded-lg'>
										<p>Loading</p>
										<div className='animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-[2.2px] border-r-none border-r-white border-transparent'></div>
									</div>
								) : (
									'Apply'
								)}
							</div>
						</button>
					</div>
				</>
				{/* )} */}
			</form>
		</MaxWidthWrapper>
	)
}

export default UserApplicationComp
