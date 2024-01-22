import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
// import { useSession } from "@/hooks/useSession"
import { useNavigate, useLocation } from 'react-router-dom'
// import { AuthContext } from "@/hooks/AuthContext"
import { toast } from 'react-hot-toast'
import { LuFolderEdit } from 'react-icons/lu'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { IoWarningOutline } from 'react-icons/io5'
const API = axios.create({ baseURL: 'http://localhost:5173' })

const UserRegister = () => {
	const { mainLoading, setLoginData, setUser } =
		useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { state } = useLocation()
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
	const [form, setForm] = useState({
		fullname: '',
		domain_id: '',
		prn: '',
		password: '',
		department: '',
		year: '',
		sem: '',
		number: '',
		idCard: ''
	})
	const [errors, setErrors] = useState({
		fullname: '',
		domain_id: '',
		prn: '',
		password: '',
		department: '',
		year: '',
		sem: '',
		number: '',
		idCard: ''
	})
	const [selectedImage, setSelectedImage] = useState()
	const handleImageChange = (e) => {
		const file = e.target.files[0]
		setForm({ ...form, idCard: e.target.files[0] })
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				setSelectedImage(reader.result)
			}
			reader.readAsDataURL(file)
		}
	}

	const registerHelper = async () => {
		const formData = new FormData()
		formData.append('fullname', form?.fullname)
		formData.append('domain_id', form?.domain_id)
		formData.append('prn', form?.prn)
		formData.append('password', form?.password)
		formData.append('department', form?.department)
		formData.append('year', form?.year)
		formData.append('sem', form?.sem)
		formData.append('number', form?.number)
		formData.append('idCard', form?.idCard)
		console.log(form)
		var response
		try {
			response = await axios({
				method: 'post',
				url: 'http://localhost:8000/api/v1/student/register',
				data: formData,
				header: {
					'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
				}
			})
			const res = response?.data
			console.log(res)
			setLoginData(res?.data)
			setUser(res?.data?._doc)
			toast.success('Register Successful')
			navigate(state?.path || '/user/profile')
		} catch (e) {
			console.log(e)
			if (e?.response?.status === 401) {
				setErrors({
					fullname: '',
					domain_id: '',
					prn: '',
					password: '',
					department: '',
					year: '',
					sem: '',
					number: '',
					idCard: "Couldn't save your Id Card Information"
				})
			} else if (e?.response?.status === 409) {
				setErrors({
					fullname: '',
					prn: '',
					password: '',
					department: '',
					year: '',
					sem: '',
					number: '',
					idCard: '',
					domain_id: 'User with entered Domain Id already exists'
				})
				toast.error(
					"There's Already a student with your entered domain id"
				)
			} else if (e?.response?.status === 403) {
				setErrors({
					fullname: '',
					domain_id: '',
					password: '',
					department: '',
					year: '',
					sem: '',
					number: '',
					idCard: '',
					prn: 'User with entered PRN already exists'
				})
				toast.error("There's Already a student with your entered PRN")
			} else {
				toast.error(
					'Some Error Ocurred Please Register after some time'
				)
			}
		}
	}

	const validateForm = () => {
		let valid = true
		const newErrors = { ...errors }

		if (!form.fullname) {
			newErrors.fullname = 'Name is required'
			valid = false
		} else {
			newErrors.name = ''
		}

		if (!form.domain_id) {
			newErrors.domain_id = 'Email is required'
			valid = false
		} else if (
			!/^[a-zA-Z0-9._%+-]+@mhssce\.ac\.in$/.test(form.domain_id)
		) {
			newErrors.domain_id = 'College Domain Email required'
			valid = false
		} else {
			newErrors.domain_id = ''
		}

		if (!form.number) {
			newErrors.number = 'Phone Number is required'
			valid = false
		} else if (!/^[0-9]{10}$/.test(form.number)) {
			newErrors.number =
				'Phone Number should contain exactly 10 numeric digits'
			valid = false
		} else {
			newErrors.number = ''
		}

		if (!form.prn) {
			newErrors.prn = 'PRN is required'
			valid = false
		} else if (!/^[0-9]{6}$/.test(form.prn)) {
			newErrors.prn = 'PRN contains exactly 6 numeric value'
			valid = false
		} else {
			newErrors.email = ''
		}

		if (!form.password) {
			newErrors.password = 'Password is required'
			valid = false
		} else if (
			!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}/.test(form.password)
		) {
			newErrors.password =
				'Password must be at least 6 characters long and should contain {aA-zZ,0-9}'
			valid = false
		} else {
			newErrors.password = ''
		}

		const fileSize = form?.idCard?.size / 1024
		const allowedSize = 1024
		const thresholdSize = 102
		if (!form?.idCard) {
			newErrors.idCard = 'ID card is required'
			valid = false
		} else if (
			form?.idCard.type !== 'image/jpeg' &&
			form?.idCard.type !== 'image/jpg'
		) {
			newErrors.idCard = 'Image must be in JPEG/JPG format'
			valid = false
		} else if (fileSize > allowedSize) {
			newErrors.idCard = 'Image size must be under 1MB'
			valid = false
		} else if (fileSize < thresholdSize) {
			newErrors.idCard = 'Image size must over  100kB'
			valid = false
		} else {
			newErrors.idCard = ''
		}

		if (!form?.department) {
			newErrors.department = 'Department is required'
			console.log('not included')
			valid = false
		} else if (!dept_options.includes(form?.department)) {
			newErrors.department = 'Please select a valid department'
			console.log('not included')
			valid = false
		} else {
			newErrors.department = ''
		}
		if (!form?.sem) {
			newErrors.sem = 'Sem is required'
			valid = false
		} else if (!sem_options.includes(form?.sem)) {
			newErrors.sem = 'Please Select a valid Sem'
			valid = false
		} else {
			newErrors.sem = ''
		}
		if (!form?.year) {
			newErrors.year = 'Year is required'
			valid = false
		} else if (!year_options.includes(form?.year)) {
			newErrors.year = 'Please Select a valid Year'
			valid = false
		} else {
			newErrors.year = ''
		}
		setErrors(newErrors)
		return valid
	}

	const SubmitHandler = async (e) => {
		e.preventDefault()
		if (validateForm()) {
			await registerHelper()
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
	}
	return (
		<div className='w-full h-full flex items-center justify-center mx-auto max-w-4xl max-h-4xl text-gray-800/90 min-h-screen py-6 '>
			{!mainLoading ? (
				<>
					<div className='flex flex-col relative max-w-[500px] items-center py-12 px-12 flex-grow bg-white border-2 border-[#40916c] shadow-green-900/50  rounded-lg space-y-8 xl:space-y-10 '>
						<div className='flex w-full flex-col '>
							<h2 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center'>
								Register
							</h2>
							<h6 className='text-sm md:text-base lg:text-lg mt-4 text-center'>
								Populate your user profile and start your application
								here
							</h6>
						</div>
						<div className='bg-green-800/20 w-[90%] sm:w-[85%] md:w-[80%] h-[2px] rounded-xl'></div>
						<form className='flex flex-col w-full mx-auto max-w-[400px] space-y-3 items-center'>
							<div className=' text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full'>
								<input
									disabled={loading}
									type='text'
									name='fullname'
									required={true}
									placeholder='Full Name'
									value={form.fullname}
									onChange={(e) =>
										setForm({ ...form, fullname: e.target.value })
									}
									className={` ${
										errors.fullname &&
										'border-[1.5px] border-red-400 '
									} w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-200 focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3`}
								/>
								<p className='text-red-400 text-start text-sm ml-2 font-normal '>
									{errors.fullname || '‎'}
								</p>
							</div>
							<div className=' text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full'>
								<input
									disabled={loading}
									type='text'
									name='prn'
									required={true}
									placeholder='PRN'
									value={form.prn}
									pattern='[0-9]{20}'
									maxLength={6}
									onChange={(e) =>
										setForm({ ...form, prn: e.target.value })
									}
									className={` ${
										errors.prn && 'border-[1.5px] border-red-400 '
									} w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-200 focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3`}
								/>
								<p className='text-red-400 text-start text-sm ml-2 font-normal '>
									{errors.prn || '‎'}
								</p>
							</div>
							<div className=' text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full'>
								<input
									disabled={loading}
									type='email'
									name='domain_id'
									required
									placeholder='Email'
									value={form.domain_id}
									onChange={(e) =>
										setForm({ ...form, domain_id: e.target.value })
									}
									className={`  ${
										errors.domain_id &&
										'border-[1.5px] border-red-400 '
									} w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-200 focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3`}
								/>
								<p className='text-red-400 text-start text-sm ml-2 font-normal '>
									{errors.domain_id || '‎'}
								</p>
							</div>
							<div className=' text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full'>
								<select
									name='department'
									required={true}
									placeholder='department'
									value={form.department}
									onChange={(e) =>
										setForm({ ...form, department: e.target.value })
									}
									className={` ${
										errors.department &&
										'border-[1.5px] border-red-500 '
									} w-full caret-green-600 lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-200  focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3`}
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
								<p className='text-red-400 text-start text-sm ml-2 font-normal '>
									{errors.department || '‎'}
								</p>
							</div>
							<div className=' text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full'>
								<select
									name='sem'
									required={true}
									placeholder='sem'
									value={form.sem}
									onChange={(e) =>
										setForm({ ...form, sem: e.target.value })
									}
									className={` ${
										errors.sem && 'border-[1.5px] border-red-500 '
									} w-full caret-green-600 lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-200  focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3`}
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
								<p className='text-red-400 text-start text-sm ml-2 font-normal '>
									{errors.sem || '‎'}
								</p>
							</div>
							<div className=' text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full '>
								<select
									name='year'
									required={true}
									placeholder='(FE, SE, ...)'
									value={form.year}
									onChange={(e) =>
										setForm({ ...form, year: e.target.value })
									}
									className={` ${
										errors.year && 'border-[1.5px] border-red-500 '
									} w-full caret-green-600 lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-200  focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3`}
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
								<p className='text-red-400 text-start text-sm ml-2 font-normal '>
									{errors.year || '‎'}
								</p>
							</div>
							<div className=' text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full'>
								<input
									disabled={loading}
									type='text'
									name='Phone Number'
									required={true}
									placeholder='Phone Number'
									value={form.number}
									pattern='[0-9]'
									maxLength={10}
									onChange={(e) =>
										setForm({ ...form, number: e.target.value })
									}
									className={` ${
										errors.number && 'border-[1.5px] border-red-400 '
									} w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-200 focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3`}
								/>
								<p className='text-red-400 text-start text-sm ml-2 font-normal '>
									{errors.number || '‎'}
								</p>
							</div>
							<div className=' text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full'>
								<input
									disabled={loading}
									type='password'
									name='password'
									required={true}
									autoComplete='true'
									placeholder='Password'
									value={form.password}
									onChange={(e) =>
										setForm({ ...form, password: e.target.value })
									}
									className={`  ${
										errors.password &&
										'border-[1.5px] border-red-400 '
									} w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-200 focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3`}
								/>
								<p className='text-red-400 text-start text-sm ml-2 font-normal '>
									{errors.password || '‎'}
								</p>
							</div>
							<div className=' text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full'>
								<label
									htmlFor='image-input'
									className=' relative cursor-pointer'
								>
									<p className=' text-sm md:text-base font-medium rounded-lg bg-[#40916c] p-1 w-max m-1 px-2 text-white mb-2 '>
										Id Card
									</p>
									<img
										src={
											selectedImage
												? selectedImage
												: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
										}
										alt='Selected Image'
										className={` ${
											errors.idCard && 'border-2 border-[#db3100] '
										} w-full h-full aspect-video rounded-lg md:rounded-xl lg:rounded-2xl object-cover`}
										width={100}
										height={100}
									/>
									<div className='absolute top-5 -right-4 bg-[#74c69d] rounded-lg md:rounded-xl lg:rounded-2xl p-2 md:p-3 '>
										<LuFolderEdit className='w-5 h-5 md:h-6 md:w-6' />
									</div>
								</label>
								<input
									disabled={loading}
									id='image-input'
									type='file'
									accept='image/*'
									className='hidden'
									name='idCard'
									required={true}
									onChange={handleImageChange}
								/>
								<p className='text-red-400 text-start text-sm ml-2 font-normal '>
									{errors.idCard || '‎'}
								</p>
							</div>

							<div className='text-base md:text-lg xl:text-xl md:p-2 font-normal w-full'>
								<button
									type='submit'
									onClick={SubmitHandler}
									className='bg-gradient-to-tr from-[#40916c] to-[#74c69d] hover:scale-105 transition-all duration-200  px-3 py-2 md:px-6 lg:px-8 rounded-lg text-white shadow-lg font-semibold  w-full'
								>
									{loading ? (
										<div className='flex items-center space-x-3 justify-center rounded-lg'>
											<p>Loading</p>
											<div className='animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-[2.2px] border-r-none border-r-white border-transparent'></div>
										</div>
									) : (
										'Register'
									)}
								</button>
							</div>

							<a
								href='/user/login'
								className='group hover:underline-offset-[5px] text-sm decoration hover:decoration-green-500 hover:underline hover:decora hover:decoration-2 font-normal hover:font-semibold cursor-pointer w-max sm:text-base md:text-lg -mt-2 flex justify-center items-center'
							>
								<span>Already have an Account? </span>
								<span className=' text-green-700  '>‎ Login </span>
							</a>
						</form>
						<div className='absolute w-full h-full -bottom-2 left-2 rounded-2xl bg-[#74c69d] -z-30 '></div>
					</div>
				</>
			) : (
				<div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-500 z-50'>
					<div className='flex items-center space-x-3 bg-white px-3 py-2 rounded-lg'>
						<h2 className='text-lg font-semibold'>Loading</h2>
						<div className='animate-spin rounded-full h-4 w-4 border-[2.2px] border-r-none border-r-white border-[#40916c]'></div>
					</div>
				</div>
			)}
		</div>
	)
}

export default UserRegister
