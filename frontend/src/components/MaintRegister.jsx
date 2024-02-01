import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import MaxWidthWrapper from './MaxWidthWrapper'

const MaintRegisterComp = () => {
	const {
		mainLoding,
		user,
		userType,
		setUserType,
		setUser,
		setToken_,
		setLoginData
	} = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { state } = useLocation()
	const [form, setForm] = useState({
		email: '',
		password: '',
		fullname: '',
		key: ''
	})
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		fullname: '',
		key: ''
	})

	const validateForm = () => {
		let valid = true
		const newErrors = { ...errors }

		if (!form.fullname) {
			newErrors.fullname = 'Name is required'
			valid = false
		} else {
			newErrors.fullname = ''
		}

		if (!form.email) {
			newErrors.email = 'Email is required'
			valid = false
		} else if (
			!/^[a-zA-Z0-9._%+-]+@mhssce\.ac\.in$/.test(form.email)
		) {
			newErrors.email = 'College Domain Email required'
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
		if (!form.key) {
			newErrors.key = 'Key is required'
			valid = false
		} else {
			newErrors.key = ''
		}

		setErrors(newErrors)
		console.log(errors)
		return valid
	}
	const loginHelper = async (
		email,
		password,
		key,
		department,
		fullname
	) => {
		var response
		try {
			response = await axios({
				method: 'post',
				url: `${
					import.meta.env.VITE_REACT_BACKEND_PORT_URL
				}/api/v1/admin/register`,
				data: { type: 'maintenance', ...form },
				header: {
					'Content-Type': 'application/json'
				}
			})
			const res = response?.data
			console.log(res)
			setLoginData(res?.data)
			setUser(res?.data?._doc)
			// toast.success(`Welcome to DLRC, ${res?.data?._doc?.fullname} `)
			// navigate(state?.path || '/maintenance/user')
		} catch (e) {
			console.log(e)
			if (e?.response?.status === 401) {
				toast.error('Please Fill All the necessary Information')
			} else if (e?.response?.status === 404) {
				setErrors({
					email: 'Maintenance User with same email already exists',
					password: '',
					fullname: '',
					key: ''
				})
				toast.error('Maintenance User Already Exists')
			} else if (e?.response?.status === 405) {
				setErrors({
					email: '',
					password: '',
					fullname: '',
					key: 'Please enter correct secret key'
				})
				toast.error('Enter Correct Secret Key')
			} else {
				toast.error(
					'Some Error Ocurred Please Register after some time'
				)
			}
		}
	}
	const SubmitHandler = (e) => {
		e.preventDefault()
		if (validateForm()) {
			loginHelper()
		} else {
			console.log('error')
		}
	}
	return (
		<MaxWidthWrapper className='w-full h-full flex items-center justify-center mx-auto max-w-4xl max-h-4xl text-gray-800/90 min-h-screen py-6 '>
			{!mainLoding ? (
				<>
					<div className='flex flex-col relative max-w-[500px] items-center py-12 px-4 sm:px-6 md:px-12 flex-grow bg-white border-2 border-[#40916c] shadow-green-900/50  rounded-lg space-y-8 xl:space-y-10  '>
						<div className='flex w-full flex-col '>
							<h2 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center'>
								Register
							</h2>
							<h6 className='text-sm mt-4 text-center'>
								Make sure that you already have a developer defined
								secret key with you
							</h6>
						</div>
						<div className='bg-green-800/20 w-[90%] sm:w-[85%] md:w-[80%] h-[2px] rounded-xl'></div>
						<form
							className={`flex flex-col w-full mx-auto max-w-[400px] space-y-3 items-center ${
								loading && 'opacity-60'
							} `}
						>
							<div className='text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full'>
								<input
									disabled={loading}
									type='text'
									name='fullname'
									required={true}
									placeholder='Full Name'
									value={form.fullname}
									pattern='[0-9]{20}'
									maxLength={20}
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
							<div className='text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full'>
								<input
									disabled={loading}
									type='email'
									name='email'
									required
									placeholder='Email'
									value={form.email}
									onChange={(e) =>
										setForm({ ...form, email: e.target.value })
									}
									className={` ${
										errors.email && 'border-[1.5px] border-red-400 '
									} w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-200 focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3`}
								/>
								<p className='text-red-400 text-start text-sm ml-2 font-normal '>
									{errors.email || '‎'}
								</p>
							</div>
							<div className='text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full'>
								<input
									disabled={loading}
									type='password'
									name='password'
									required
									autoComplete='true'
									placeholder='Password'
									value={form.password}
									onChange={(e) =>
										setForm({ ...form, password: e.target.value })
									}
									className={` ${
										errors.password &&
										'border-[1.5px] border-red-400 '
									} w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-200 focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3`}
								/>
								<p className='text-red-400 text-start text-sm ml-2 font-normal '>
									{errors.password || '‎'}
								</p>
							</div>

							<div className='text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full'>
								<input
									disabled={loading}
									type='text'
									name='key'
									required={true}
									placeholder='Secret Key'
									value={form.key}
									onChange={(e) =>
										setForm({ ...form, key: e.target.value })
									}
									className={` ${
										errors.key && 'border-[1.5px] border-red-400 '
									} w-full lg:px-4 placeholder:font-medium font-normal h-10 bg-stone-200 focus:outline-[#40916c] placeholder:text-gray-500 text-gray-800 rounded-lg p-2 md:px-3`}
								/>
								<p className='text-red-400 text-start text-sm ml-2 font-normal '>
									{errors.key || '‎'}
								</p>
							</div>
							<div className='text-base md:text-lg xl:text-xl md:p-2  font-normal w-full'>
								<button
									type='submit'
									onClick={SubmitHandler}
									className='bg-gradient-to-tr from-[#40916c] to-[#74c69d] hover:scale-105 transition-all duration-200 px-3 py-2 md:px-6 lg:px-8 rounded-lg text-white shadow-lg font-semibold  w-full'
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
								href='/maintenance/login'
								className='group hover:underline-offset-[5px] text-sm decoration hover:decoration-green-500 hover:underline hover:decora hover:decoration-2 font-normal hover:font-semibold cursor-pointer w-max sm:text-base md:text-lg -mt-2 flex justify-center items-center  flex-col sm:flex-row'
							>
								<span>Already in Maintenance Team? </span>
								<span className=' text-green-700  '>‎ Login</span>
							</a>
						</form>
						{/* <div className='absolute w-full h-full -bottom-2 left-2 rounded-2xl bg-[#74c69d] -z-30 '></div> */}
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
		</MaxWidthWrapper>
	)
}

export default MaintRegisterComp
