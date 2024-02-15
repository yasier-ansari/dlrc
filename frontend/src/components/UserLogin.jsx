import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'
import MaxWidthWrapper from './MaxWidthWrapper'
import axios from 'axios'
import InputItem from "./InputItem"
import FormContainer from "./FormContainer"
import PageLoading from "./PageLoading"
import AuthContainer from "./AuthContainer"

const UserLogin = () => {
	const { token, user, setUser, setLoginData, mainLoading } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const { state } = useLocation()
	const [form, setForm] = useState({
		email: '',
		password: '',
		prn: ''
	})
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		prn: ''
	})
	const navigate = useNavigate()
	const validateForm = () => {
		let valid = true
		const newErrors = { ...errors }
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
			valid = true
		}
		if (!form.prn) {
			newErrors.prn = 'PRN is required'
			valid = false
		} else if (!/^[0-9]{6}$/.test(form.prn)) {
			newErrors.prn = 'PRN contains 6 numeric value'
			valid = false
		} else {
			newErrors.email = ''
			valid = true
		}
		if (!form.password) {
			newErrors.password = 'password is required'
			valid = false
		} else {
			newErrors.password = ''
			valid = true
		}
		setErrors(newErrors)
		return valid
	}

	const loginHelper = async (email, prn, password) => {
		let response
		try {
			const apiUrl = `${import.meta.env.MODE === 'development'
				? import.meta.env.VITE_REACT_BACKEND_PORT_URL_DEV
				: import.meta.env.VITE_REACT_BACKEND_PORT_URL_PROD
				}/api/v1/student/login`
			console.log(apiUrl)
			response = await axios({
				url: `${import.meta.env.MODE === 'development'
					? import.meta.env.VITE_REACT_BACKEND_PORT_URL_DEV
					: import.meta.env.VITE_REACT_BACKEND_PORT_URL_PROD}/api/v1/student/login`,
				method: 'POST',
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json'
				},
				data: { domain_id: email, prn, password }
			})
			const res = response.data
			console.log(res)
			setLoginData(res?.data)
			toast.success('Welcom Back Student')
			navigate(state?.path || '/user/profile')
		} catch (e) {
			console.log(e)
			if (e?.response?.status === 401) {
				setErrors({
					prn: '',
					email: '',
					password: 'Input the correct password'
				})
			} else if (e?.response?.status === 404) {
				setErrors({
					prn: '',
					password: '',
					email: 'Email not registered yet'
				})
			} else if (e?.response?.status === 403) {
				setErrors({
					email: '',
					password: '',
					prn: 'PRN not registered yet'
				})
			} else {
				toast.error(`Login fail - "Some Error Ocurred"`, {
					position: 'top-center'
				})
			}
		}
	}

	const loginUserHandler = async (e) => {
		e.preventDefault()
		if (validateForm()) {
			setLoading(true)
			await loginHelper(form?.email, form?.prn, form?.password)
			setLoading(false)
		}
	}
	useEffect(() => {
		const getUserIfExists = () => {
			if (user) {
				navigate(state?.path || '/user/profile')
			}
		}
		getUserIfExists()
	}, [])
	return (
		<MaxWidthWrapper className='w-full h-full items-center justify-center mx-auto max-w-4xl max-h-4xl text-gray-800/90 py-6 flex grow px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24'>
			{!mainLoading ? (
				<>
					<AuthContainer action='Login' actionText='continue your application or track your DLRC
								application status'
					>
						<FormContainer loading={loading} inverseAction='Register' inverseActionText='No Account?' inverseUrl='/user/register' buttonText='Login' onClick={loginUserHandler} >
							<InputItem
								disabled={loading}
								type={'text'}
								name={'prn'}
								required={true}
								placeholder={'PRN'}
								value={form?.prn}
								errors={errors?.prn}
								pattern='[0-9]{6}'
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
								className={'w-full'} />
							<InputItem
								disabled={loading}
								type={'email'}
								name={'email'}
								required={true}
								placeholder={'Email'}
								value={form?.email}
								errors={errors?.email}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
								className={'w-full'}
							/>
							<InputItem
								disabled={loading}
								type={'password'}
								name={'password'}
								required={true}
								placeholder={'Password'}
								value={form?.password}
								errors={errors?.password}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
								className={'w-full'}
							/>
						</FormContainer>
					</AuthContainer>
				</>
			) : (
				<PageLoading />
			)}
		</MaxWidthWrapper>
	)
}

export default UserLogin
