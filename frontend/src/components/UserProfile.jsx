import React, { useContext, useEffect, useState } from 'react'
import { LuUserCircle2 } from 'react-icons/lu'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { IoWarningOutline } from 'react-icons/io5'
import MaxWidthWrapper from './MaxWidthWrapper'
import PageLoading from "./PageLoading"
import InfoPageContainer from "./InfoPageContainer"
import InfoPageFormContainer from "./InfoPageFormContainer"
import InfoPageFormInput from "./InfoPageFormInput"
import InfoPageFormSelect from "./InfoPageFormSelect"
import LabelledImageContainer from "./LabelledImageContainer"
import InfoPageButtonContainer from "./InfoPageButtonContainer"
import LoadingButton from "./LoadingButton"
import InfoContainer from "./InfoContainer"
import RequestContainer from "./RequestContainer"
import NormalText from "./ui/normalText"
const UserProfile = () => {
	const [loading, setLoading] = useState(false)
	const [flag, setFlag] = useState(true)
	const { setModalPopped, user, token, setUser, setLoginData, mainLoading } =
		useContext(AuthContext)
	const [request, setRequest] = useState(null)
	const [selectedImage, setSelectedImage] = useState()
	const navigate = useNavigate()
	const dept_options = [
		{ value: 'CSE (AI - ML)', text: 'CSE (AI - ML)', id: 1 },
		{ value: 'CSE (IOT - BT)', text: 'CSE (IOT - BT)', id: 2 },
		{ value: 'COMPS', text: 'COMPS', id: 3 },
		{ value: 'IT', text: 'IT', id: 4 },
		{ value: 'Electrical', text: 'Electrical', id: 5 },
		{ value: 'Mechanical', text: 'Mechanical', id: 6 },
		{ value: 'Civil', text: 'Civil', id: 7 },
		{ value: 'AutoMobile', text: 'AutoMobile', id: 8 }
	]
	const sem_options = [
		{ value: 'I', text: 'I', id: 1 },
		{ value: 'II', text: 'II', id: 2 },
		{ value: 'III', text: 'III', id: 3 },
		{ value: 'IV', text: 'IV', id: 4 },
		{ value: 'V', text: 'V', id: 5 },
		{ value: 'VI', text: 'VI', id: 6 },
		{ value: 'VII', text: 'VII', id: 7 },
		{ value: 'VIII', text: 'VIII', id: 8 },
	]
	const year_options = [
		{ value: 'FE', text: 'FE', id: 1 },
		{ value: 'SE', text: 'SE', id: 2 },
		{ value: 'TE', text: 'TE', id: 3 },
		{ value: 'BE', text: 'BE', id: 4 }
	]
	const [form, setForm] = useState({
		fullname: user?.fullname || '',
		domain_id: user?.domain_id || '',
		prn: user?.prn || '',
		department: user?.department || '',
		year: user?.year || '',
		sem: user?.sem || '',
		number: user?.number || ''
		// idCard: user?.idCard || ''
	})
	const [errors, setErrors] = useState({
		fullname: '',
		domain_id: '',
		prn: '',
		// password: '',
		department: '',
		year: '',
		sem: '',
		number: ''
		// idCard: ''
	})
	const validateForm = () => {
		let valid = true
		const newErrors = { ...errors }

		if (!form.fullname) {
			newErrors.fullname = 'Name is required'
			valid = false
		} else if (form.fullname.trim().length < 2) {
			newErrors.fullname = 'First and Last Name is required'
			valid = false
		} else {
			newErrors.fullname = ''
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
				method: 'POST',
				url: `${import.meta.env.MODE === 'development'
					? import.meta.env.VITE_REACT_BACKEND_PORT_URL_DEV
					: import.meta.env.VITE_REACT_BACKEND_PORT_URL_PROD}/api/v1/student/update-profile`,
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
		} else {

		}
	}
	useEffect(() => {
		setLoading(true)
		const getData = async () => {
			const fetchUserProfile = async (accessToken) => {
				try {
					const response = await axios({
						url: `${import.meta.env.MODE === 'development'
							? import.meta.env.VITE_REACT_BACKEND_PORT_URL_DEV
							: import.meta.env.VITE_REACT_BACKEND_PORT_URL_PROD}/api/v1/student/profile`,
						method: 'GET',
						withCredentials: true,
						headers: { Authorization: `Bearer ${accessToken}` }
					})
					const userProfile = response.data
					// console.log(userProfile)
					setUser(userProfile?.data)
					setForm({ ...form, ...userProfile?.data })
				} catch (error) {
					console.error('Error fetching user profile:', error)
					setUser(null)
				}
			}
			const fetchRequests = async (id, accessToken) => {
				try {
					const response = await axios({
						method: 'GET',
						url: `${import.meta.env.MODE === 'development'
							? import.meta.env.VITE_REACT_BACKEND_PORT_URL_DEV
							: import.meta.env.VITE_REACT_BACKEND_PORT_URL_PROD}/api/v1/student/recent-request`,
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
		if (mainLoading) {
			getData()
		}
		setLoading(false)
	}, [token, flag])
	console.log(user)

	return (
		<MaxWidthWrapper className='w-full h-full items-center justify-center mx-auto max-w-6xl text-gray-800/90 py-6 flex grow px-8 md:px-12 lg:px-20 xl:px-24 flex-col'>
			{
				!mainLoading ? <>
					<InfoPageContainer
						loading={loading}
						heading={'Profile'}
						Icon={LuUserCircle2}
						className={' max-w-6xl '}
						innerClassName={'max-w-3xl'}
					>
						<NormalText className={'pb-8 md:pb-12'} >
							These profile information would be attached to your laptop
							application, so please update them if needed. Once applied
							these updated change wont be included in the previous
							applications. College Id card are not updatable, If you need
							to update those, contact your Department Head.
						</NormalText>
						<InfoPageFormContainer>
							<InfoPageFormInput
								label={'Full Name'}
								name={'fullname'}
								disabled={loading}
								value={form?.fullname}
								errors={errors?.fullname}
								type={'text'}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
							/>
						</InfoPageFormContainer>
						<InfoPageFormContainer>
							<InfoPageFormInput
								label={'Email'}
								name={'domain_id'}
								disabled={loading}
								value={form?.domain_id}
								error={errors?.domain_id}
								type={'email'}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
							/>
						</InfoPageFormContainer>
						<InfoPageFormContainer>
							<InfoPageFormInput
								label={'Mobile Number'}
								name={'number'}
								disabled={loading}
								value={form?.number}
								pattern="[0-9]{10}"
								maxLength={10}
								minLength={10}
								error={errors?.number}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
							/>
						</InfoPageFormContainer>
						<InfoPageFormContainer>
							<InfoPageFormInput
								label={'PRN'}
								name={'prn'}
								disabled={loading}
								value={form?.prn}
								error={errors?.prn}
								type={'text'}
								pattern="[0-9]{6}"
								maxLength={6}
								minLength={6}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
							/>
							<InfoPageFormSelect
								label={'Department'}
								name={'department'}
								disabled={loading}
								value={form?.department}
								error={errors?.department}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
								options={dept_options}
							/>
						</InfoPageFormContainer>
						<InfoPageFormContainer>
							<InfoPageFormSelect
								label={'year'}
								name={'year'}
								disabled={loading}
								value={form?.year}
								error={errors?.year}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
								options={year_options}
							/>
							<InfoPageFormSelect
								label={'Sem'}
								name={'sem'}
								disabled={loading}
								value={form?.sem}
								error={errors?.sem}
								onChange={(fieldName, fieldValue) => setForm({ ...form, [fieldName]: fieldValue })}
								options={sem_options}
							/>
						</InfoPageFormContainer>
						<InfoPageFormContainer>
							<LabelledImageContainer
								imageUrl={`https://dlrc-public-demo.s3.ap-south-1.amazonaws.com//id-card/${user?.idCard}`}
								label={'Id Card ( not editable )'}

							/>
						</InfoPageFormContainer>
						<InfoPageButtonContainer>
							<LoadingButton
								className={'max-w-xl'}
								onClick={SubmitHandler}
								disabled={loading}
								loading={loading}
								buttonText={'Update'} />
						</InfoPageButtonContainer>
					</InfoPageContainer>
					<div
						className={`flex items-center w-full justify-center mx-auto flex-col space-y-12 max-w-6xl  pb-20 `}
					>
						{loading ? (
							<RequestContainer loading={true} />
						) : (
							<>
								{request?.request?.length > 0 ||
									request?.issue?.length > 0 ? (
									<>
										<div className='flex items-center justify-center w-full bg-stone-300 h-[2px] rounded-full mt-12 '></div>
										<InfoContainer id='request-history' title={'Request'} >
											{
												request?.issue ? (
													<RequestContainer data={request} approved={true} loading={false} title={'Issuance Fulfilled'} issued={true} rejected={false} />
												) : request?.request[0]?.status === 'Rejected' ?
													(
														<RequestContainer data={request} approved={true} loading={false} title={'Approval Rejected'} issued={false} rejected={true} />
													) : true ?
														(
															<RequestContainer data={request} approved={true} loading={false} title={'Issuance Pending'} issued={false} rejected={false} />

														) : (
															<RequestContainer data={request} approved={false} loading={false} title={'Approval Pending'} issued={false} rejected={false} />

														)
											}
										</InfoContainer>
									</>
								) :
									null
								}
							</>
						)}
					</div>
				</> :
					<PageLoading />
			}
		</MaxWidthWrapper >
	)
}

export default UserProfile
