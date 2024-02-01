import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import MaxWidthWrapper from './MaxWidthWrapper'
import axios from 'axios'

const AdminLoginComp = () => {
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
		password: ''
	})
	const [errors, setErrors] = useState({
		email: '',
		password: ''
	})

	const validateForm = () => {
		let valid = true
		const newErrors = { ...errors }
		if (!form.email) {
			newErrors.email = 'Email is required'
			valid = false
		}

		if (!form.password) {
			newErrors.password = 'Password is required'
			valid = false
		}
		setErrors(newErrors)
		return valid
	}
	const loginHelper = async (email, password) => {
		let response
		try {
			response = await axios({
				url: `${
					import.meta.env.VITE_REACT_BACKEND_PORT_URL
				}/api/v1/admin/login`,
				method: 'post',
				withCredentials: true,

				headers: {
					'Content-Type': 'application/json'
				},
				data: { email, password, type: 'admin' }
			})
			const res = response.data
			setLoginData(res?.data)
			toast.success('Login Successfull')
			navigate(state?.path || '/admin/user')
		} catch (e) {
			if (e?.response?.status === 401) {
				setErrors({
					email: '',
					password: 'Input the correct password'
				})
			} else if (e?.response?.status === 404) {
				setErrors({ password: '', email: 'Email not registered yet' })
			} else {
				toast.error(`Login fail - "Some Error Ocurred"`, {
					position: 'top-center'
				})
			}
		}
	}
	const submitHandler = async (e) => {
		e.preventDefault()
		if (validateForm()) {
			await loginHelper(form?.email, form?.password)
		}
	}
	return (
		<MaxWidthWrapper className='w-full h-full items-center justify-center mx-auto max-w-4xl max-h-4xl text-gray-800/90 py-6 flex grow px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 '>
			{!mainLoding ? (
				<>
					<div className='flex flex-col relative max-w-[500px] items-center py-12 px-4 sm:px-6 md:px-12 flex-grow bg-white border-2 border-[#40916c] shadow-green-900/50  rounded-lg space-y-8 xl:space-y-10'>
						<div className='flex w-full flex-col '>
							<h2 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center'>
								Log In
							</h2>
						</div>
						<div className='bg-green-800/20 w-[90%] sm:w-[85%] md:w-[80%] h-[2px] rounded-xl'></div>
						<form
							className={`flex flex-col w-full mx-auto max-w-[400px] space-y-3 items-center ${
								loading && 'opacity-60'
							} `}
						>
							<div className='text-base md:text-lg w-full'>
								<input
									disabled={loading}
									type='test'
									name='email'
									required
									placeholder='Email'
									value={form?.email}
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
							<div className='text-base md:text-lg w-full'>
								<input
									disabled={loading}
									type='password'
									name='password'
									required
									placeholder='Password'
									value={form?.password}
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
							<div className='text-base md:text-lg xl:text-xl md:p-2  font-normal w-full'>
								<button
									type='submit'
									onClick={submitHandler}
									className='bg-gradient-to-tr from-[#40916c] to-[#74c69d] hover:scale-105 transition-all duration-200 px-3 py-2 md:px-6 lg:px-8 rounded-lg text-white shadow-lg font-semibold  w-full'
								>
									{loading ? (
										<div className='flex items-center space-x-3 justify-center rounded-lg'>
											<p>Loading</p>
											<div className='animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-[2.2px] border-r-none border-r-white border-transparent'></div>
										</div>
									) : (
										'Login'
									)}
								</button>
							</div>

							<a
								href='/admin/register'
								className='group hover:underline-offset-[5px] text-sm decoration hover:decoration-green-500 hover:underline hover:decora hover:decoration-2 font-normal hover:font-semibold cursor-pointer w-max sm:text-base md:text-lg -mt-2 flex justify-center items-center'
							>
								<span>Not an Admin? </span>
								<span className=' text-green-700  '>‎ Register</span>
							</a>
						</form>
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

export default AdminLoginComp
