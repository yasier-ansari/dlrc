import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { HiOutlineDocumentText } from 'react-icons/hi2'
import axios from 'axios'
import useAutosizeTextArea from '../context/AutoResizer'
import { IoWarningOutline } from 'react-icons/io5'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import MaxWidthWrapper from './MaxWidthWrapper'
import InfoPageContainer from './InfoPageContainer'
import InfoPageFormContainer from './InfoPageFormContainer'
import NormalText from './ui/normalText'
import ImageInput from './ImageInput'
import InfoPageFormInput from './InfoPageFormInput'
import InfoPageFormSelect from './InfoPageFormSelect'
import InfoOpacityContainer from './InfoOpacityContainer'
import InfoPageButtonContainer from './InfoPageButtonContainer'
import LoadingButton from './LoadingButton'
import PageLoading from "./PageLoading"

const API = axios.create({ baseURL: 'http://localhost:5173' })

const UserApplicationComp = () => {
	const { user, mainLoading, token } = useContext(AuthContext)
	const [loading, setLoading] = useState(false)

	const dur_options = [
		{ value: 'Short', text: '2-4 Weeks', id: 1 },
		{ value: 'Medium', text: '1-2 Months', id: 2 },
		{ value: 'Long', text: ' Whole Semester', id: 3 }
	]
	const ews_options = [
		{ value: 'No', text: 'No', id: 1 },
		{ value: 'Yes', text: 'Yes', id: 2 }
	]
	const fs_options = [
		{ value: 'No', text: 'No', id: 1 },
		{ value: 'Yes', text: 'Yes', id: 2 }
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
				method: 'POST',
				url: `${import.meta.env.MODE === 'development'
					? import.meta.env.VITE_REACT_BACKEND_PORT_URL_DEV
					: import.meta.env.VITE_REACT_BACKEND_PORT_URL_PROD
					}/api/v1/student/new-request`,
				data: formData,
				withCredentials: true,
				header: {
					Authorization: `Bearer ${token}`,
					'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
				}
			})
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
			{
				!mainLoading ?
					<InfoPageContainer
						heading={'Application'}
						Icon={HiOutlineDocumentText}
						loading={loading}
						className={' max-w-6xl '}
						innerClassName={'max-w-3xl'}
					>
						<NormalText className={'  pb-8 md:pb-12 '}>
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
						</NormalText>
						<InfoOpacityContainer
							title={'Your Info'}
							innerClassName={' to-green-prim-1 from-[#52b788] '}
							className={' opacity-75 border-green-400 '}
						>
							<InfoPageFormContainer>
								<InfoPageFormInput
									label={'Name'}
									name={'name'}
									disabled={loading}
									value={user?.fullname}
									type={'text'}
									noError={true}
								/>
								<InfoPageFormInput
									label={'Email'}
									name={'email'}
									disabled={loading}
									value={user?.domain_id}
									type={'text'}
									noError={true}
								/>
							</InfoPageFormContainer>
							<InfoPageFormContainer>
								<InfoPageFormInput
									label={'PRN'}
									name={'prn'}
									disabled={loading}
									value={user?.prn}
									type={'text'}
									noError={true}
								/>
								<InfoPageFormInput
									label={'Dept'}
									name={'dept'}
									disabled={loading}
									value={user?.department}
									type={'text'}
									noError={true}
								/>
							</InfoPageFormContainer>
							<InfoPageFormContainer>
								<InfoPageFormInput
									label={'Year'}
									name={'year'}
									disabled={loading}
									value={user?.year}
									type={'text'}
									noError={true}
								/>
								<InfoPageFormInput
									label={'Sem'}
									name={'sem'}
									disabled={loading}
									value={user?.sem}
									type={'text'}
									noError={true}
								/>
							</InfoPageFormContainer>
						</InfoOpacityContainer>
						<InfoPageFormContainer className={'pt-4 md:pt-8'}>
							<ImageInput
								name={'parents_Dec'}
								label={'Parent Decleration'}
								value={selectedImage1}
								disabled={loading}
								id={'select-img1'}
								onChange={handleImageChange1}
								errors={errors?.parents_Dec}
							/>
							<ImageInput
								name={'students_Dec'}
								label={'Student Decleration'}
								value={selectedImage2}
								disabled={loading}
								id={'select-img2'}
								onChange={handleImageChange2}
								errors={errors?.students_Dec}
							/>
						</InfoPageFormContainer>
						<InfoPageFormContainer>
							<ImageInput
								name={'faculty_Rec'}
								label={'Faculty Recommendation'}
								value={selectedImage3}
								disabled={loading}
								id={'select-img3'}
								onChange={handleImageChange3}
								errors={errors?.faculty_Rec}
							/>
							<ImageInput
								name={'pdc'}
								label={'Post Dated Cheque'}
								value={selectedImage4}
								disabled={loading}
								id={'select-img4'}
								onChange={handleImageChange4}
								errors={errors?.pdc}
							/>
						</InfoPageFormContainer>
						<InfoPageFormContainer>
							<InfoPageFormInput
								name={'purpose'}
								disabled={loading}
								value={form?.purpose}
								type={'text'}
								errors={errors?.purpose}
								// onChange={(e) => {
								// 	const inputValue = e.target.value;
								// 	if (inputValue.length < 101) {
								// 		setForm((prevForm) => ({ ...prevForm, purpose: inputValue }));
								// 	}
								// }}
								onChange={(fieldName, fieldValue) => {
									const inputValue = fieldValue;
									if (inputValue.length < 101) {
										setForm((prevForm) => ({ ...prevForm, [fieldName]: inputValue }));
									}
								}}
								label={'Purpose'}
								noError={false}
							>
								<p className='text-gray-500 font-medium text-sm'>
									purpose of application - {100 - form?.purpose?.length}{' '}
									characters remaining
								</p>
							</InfoPageFormInput>
							<InfoPageFormSelect
								name={'duration'}
								disabled={loading}
								value={form?.duration}
								options={dur_options}
								errors={errors?.duration}
								onChange={(e) =>
									setForm({ ...form, duration: e.target.value })
								}
								label={'Duration'}
								noError={false}
							>
								<p className='text-gray-500 font-medium text-sm'>
									purpose of application - {100 - form?.purpose?.length}{' '}
									characters remaining
								</p>
							</InfoPageFormSelect>
						</InfoPageFormContainer>
						<InfoPageFormContainer>
							<InfoPageFormSelect
								name={'ews'}
								disabled={loading}
								value={form?.ews}
								options={ews_options}
								errors={errors?.ews}
								onChange={(e) =>
									setForm({ ...form, ews: e.target.value })
								}
								label={'EWS'}
								noError={false}
							>
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
							</InfoPageFormSelect>
							<InfoPageFormSelect
								name={'family_status'}
								disabled={loading}
								value={form?.family_status}
								options={fs_options}
								errors={errors?.family_status}
								onChange={(e) =>
									setForm({ ...form, family_status: e.target.value })
								}
								label={'Family Status'}
								noError={false}
							>
								<p className='text-gray-500 font-medium text-sm'>
									Any of your guardians terminally ill or deceased?
								</p>
							</InfoPageFormSelect>
						</InfoPageFormContainer>
						<InfoPageButtonContainer>
							<LoadingButton
								className={'max-w-xl'}
								onClick={handleSubmit}
								disabled={loading}
								loading={loading}
								buttonText={'Apply'}
							/>
						</InfoPageButtonContainer>
					</InfoPageContainer>
					: <PageLoading />
			}
		</MaxWidthWrapper>
	)
}

export default UserApplicationComp
