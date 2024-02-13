import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
// import { useSession } from "@/hooks/useSession"
import { useNavigate, useLocation } from 'react-router-dom'
// import { AuthContext } from "@/hooks/AuthContext"
import { toast } from 'react-hot-toast'
import { LuEye, LuEyeOff, LuFolderEdit } from 'react-icons/lu'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { IoWarningOutline } from 'react-icons/io5'
import MaxWidthWrapper from './MaxWidthWrapper'
import AuthContainer from "./AuthContainer"
import FormContainer from "./FormContainer"
import InputItem from "./InputItem"
import SelectItem from "./SelectItem"
import PageLoading from "./PageLoading"
const API = axios.create({ baseURL: 'http://localhost:5173' })

const UserRegister = () => {
	const { mainLoading, setLoginData, setUser } =
		useContext(AuthContext)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { state } = useLocation()
	const [passVisible, setPassVisible] = useState(false)
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
				url: `${import.meta.env.MODE === 'development'
					? import.meta.env.VITE_REACT_BACKEND_PORT_URL_DEV
					: import.meta.env.VITE_REACT_BACKEND_PORT_URL_PROD}/api/v1/student/register`,
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
			newErrors.fullname = 'Full Name is required'
			valid = false
		} else if (form.fullname.trim().length < 2) {
			newErrors.fullname = 'Frist + Last Name is required'
			valid = false
		} else {
			newErrors.fullname = ''
		}

		if (!form.domain_id) {
			newErrors.domain_id = 'Email is required'
			valid = false
		} else if (
			!/^[a-zA-Z]+\.\d{6}\.[a-zA-Z]+@mhssce\.ac\.in$/.test(
				form.domain_id
			)
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
		}
	}
	return (
		<MaxWidthWrapper className='w-full h-full items-center justify-center mx-auto max-w-4xl max-h-4xl text-gray-800/90 py-6 flex grow px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 min-h-screen '>
			{!mainLoading ? (
				<>
					<AuthContainer action='Register' actionText='Populate your user profile and start your application
								here' >
						<FormContainer loading={loading} inverseAction='Login' inverseActionText='Already have Account?' inverseUrl='/user/login' buttonText='Register' onClick={SubmitHandler} >
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
								type={'text'}
								name={'prn'}
								required={true}
								placeholder={'PRN'}
								value={form?.prn}
								errors={errors?.prn}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
								className={'w-full'} />
							<InputItem
								disabled={loading}
								type={'email'}
								name={'domain_id'}
								required={true}
								placeholder={'Email'}
								value={form?.domain_id}
								errors={errors?.domain_id}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
								className={'w-full'} />
							<SelectItem
								name='department'
								required={true}
								placeholder='department'
								value={form.department}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
								errors={errors?.department}
								options={dept_options}
							/>
							<SelectItem
								name='sem'
								required={true}
								placeholder='sem'
								value={form.sem}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
								errors={errors?.sem}
								options={sem_options}
							/>
							<SelectItem
								name='year'
								required={true}
								placeholder='year'
								value={form.year}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
								errors={errors?.year}
								options={year_options}
							/>
							<InputItem
								disabled={loading}
								type={'text'}
								name={'number'}
								required={true}
								placeholder={'Mobile Number'}
								value={form?.number}
								errors={errors?.number}
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
							<div className=' text-[0.8rem] sm:text-sm md:text-base lg:text-lg w-full'>
								<label
									htmlFor='image-input'
									className=' relative cursor-pointer'
								>
									<p className=' text-xs sm:text-sm md:text-base font-medium rounded-lg bg-[#40916c] p-1 w-max m-1 px-2 text-white mb-2 '>
										Id Card
									</p>
									<img
										src={
											selectedImage
												? selectedImage
												: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgraphicsfamily.com%2Fwp-content%2Fuploads%2F2020%2F07%2FFree-online-ID-card-Template--2048x1152.jpg&f=1&nofb=1&ipt=f3f4332deb3ace7f8c6fb38df44ff2ff561dfeb90bcfd202d9c1e0434908c6bf&ipo=images'
										}
										alt='Selected Image'
										className={` ${errors.idCard && 'border-2 border-[#db3100] '
											} w-full h-full aspect-video rounded-lg md:rounded-xl object-cover`}
										width={100}
										height={100}
									/>
									<div className='absolute top-8 sm:top-9 right-0 md:top-10 bg-[#74c69d] rounded-md sm:rounded-lg md:rounded-xl  p-1 sm:p-2  '>
										<LuFolderEdit className=' w-4 h-4 sm:w-5 sm:h-5 md:h-6 md:w-6' />
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
						</FormContainer>
					</AuthContainer>
				</>
			) : (
				<PageLoading />
			)}
		</MaxWidthWrapper>
	)
}

export default UserRegister
