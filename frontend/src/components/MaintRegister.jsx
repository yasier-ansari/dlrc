import { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import MaxWidthWrapper from './MaxWidthWrapper'
import AuthContainer from "./AuthContainer"
import FormContainer from "./FormContainer"
import InputItem from "./InputItem"
import PageLoading from "./PageLoading"

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
	const loginHelper = async () => {
		var response
		try {
			response = await axios({
				method: 'post',
				url: `${import.meta.env.MODE === 'development'
					? import.meta.env.VITE_REACT_BACKEND_PORT_URL_DEV
					: import.meta.env.VITE_REACT_BACKEND_PORT_URL_PROD}/api/v1/admin/register`,
				data: { type: 'maintenance', ...form },
				header: {
					'Content-Type': 'application/json'
				}
			})
			const res = response?.data
			console.log(res)
			setLoginData(res?.data)
			setUser(res?.data?._doc)
			toast.success(`Welcome to DLRC, ${res?.data?._doc?.fullname} `)
			navigate(state?.path || '/maintenance/user')
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
		}
	}
	return (
		<MaxWidthWrapper className='w-full h-full flex items-center justify-center mx-auto max-w-4xl max-h-4xl text-gray-800/90 min-h-screen py-6 '>
			{!mainLoding ? (
				<>
					<AuthContainer
						actionText='Make sure that you already have a developer defined
								secret key with you'
						action='Register'  >
						<FormContainer
							loading={loading}
							inverseAction='Login'
							inverseActionText='Already in Maintenance Team?'
							inverseUrl='/maintenance/login'
							buttonText='Register'
							onClick={SubmitHandler}
						>
							<InputItem
								disabled={loading}
								type={'text'}
								name={'fullname'}
								required={true}
								placeholder={'Full Name'}
								value={form?.fullname}
								errors={errors?.fullname}
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
							<InputItem
								disabled={loading}
								type={'password'}
								name={'key'}
								required={true}
								placeholder={'Secret Key'}
								value={form?.key}
								errors={errors?.key}
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

export default MaintRegisterComp
