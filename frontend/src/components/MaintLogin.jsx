import { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext'
import MaxWidthWrapper from './MaxWidthWrapper'
import axios from 'axios'
import AuthContainer from "./AuthContainer"
import FormContainer from "./FormContainer"
import InputItem from "./InputItem"
import PageLoading from "./PageLoading"

const MaintLoginComp = () => {
	const { mainLoding, setLoginData, user } = useContext(AuthContext)
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
		} else {
			newErrors.password = ''
		}
		setErrors(newErrors)
		return valid
	}
	const submitHandler = async (e) => {
		e.preventDefault()
		if (validateForm()) {
			await loginHelper(form?.email, form?.password)
		}
	}
	const loginHelper = async (email, password) => {
		let response
		try {
			response = await axios({
				url: `${import.meta.env.MODE === 'development'
					? import.meta.env.VITE_REACT_BACKEND_PORT_URL_DEV
					: import.meta.env.VITE_REACT_BACKEND_PORT_URL_PROD}/api/v1/admin/login`,
				method: 'post',
				withCredentials: true,

				headers: {
					'Content-Type': 'application/json'
				},
				data: { email, password, type: 'maintenance' }
			})
			const res = response.data
			setLoginData(res?.data)
			toast.success('Welcome Back')
			navigate(state?.path || '/maintenance/user')
		} catch (e) {
			if (e?.response?.status === 401) {
				setErrors({
					email: '',
					password: 'Input the correct password'
				})
			} else if (e?.response?.status === 404) {
				setErrors({ password: '', email: 'Email not registered yet' })
			} else {
				toast.error(`Some error occurred, please try again later`)
			}
		}
	}
	useEffect(() => {
		const getUserIfExists = () => {
			if (user) {
				navigate(state?.path || '/maintenance/user')
			}
		}
		getUserIfExists()
	}, [])
	return (
		<MaxWidthWrapper className='w-full h-full items-center justify-center mx-auto max-w-4xl max-h-4xl text-gray-800/90 py-6 flex grow px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24'>
			{!mainLoding ? (
				<>
					<AuthContainer
						action='Login'
					>
						<FormContainer
							loading={loading}
							inverseAction='Register'
							inverseActionText='Not in Maintenance Team?'
							inverseUrl='/maintenance/register'
							buttonText='Login'
							onClick={submitHandler}
						>
							<InputItem
								disabled={loading}
								type={'email'}
								name={'email'}
								required={true}
								placeholder={'Email'}
								value={form?.email}
								errors={errors?.email}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
								className={'w-full'} />
							<InputItem
								disabled={loading}
								type={'password'}
								name={'password'}
								required={true}
								placeholder={'Password'}
								value={form?.password}
								errors={errors?.password}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
								className={'w-full'} />
						</FormContainer>
					</AuthContainer>
				</>
			) : (
				<PageLoading />
			)}
		</MaxWidthWrapper>
	)
}

export default MaintLoginComp
