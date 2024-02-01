import {
	useContext,
	useState,
	useRef,
	useEffect,
	useCallback
} from 'react'
import {
	LuInfo,
	LuChevronDown,
	LuBadgeInfo,
	LuMenu,
	LuX
} from 'react-icons/lu'
import { HiOutlineDocumentText } from 'react-icons/hi2'
import { GrUserAdmin } from 'react-icons/gr'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import useOnClickOutside from '../helpers/use-touch'
import MaxWidthWrapper from './MaxWidthWrapper'
import axios from 'axios'
const Header = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const [menuBar, setMenuBar] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const [loading, setLoading] = useState(true)
	const userRef = useRef(null)
	const navigate = useNavigate()
	const handleOutsideClick = useCallback(() => {
		setDropdownOpen(false)
	}, [])
	// useOnClickOutside(userRef, handleOutsideClick)
	const {
		token,
		user,
		setUser,
		setToken,
		setUserType,
		userType,
		logout
	} = useContext(AuthContext)

	const handleDropdownToggle = () => {
		if (dropdownOpen === false) {
			setDropdownOpen(true)
		} else {
			setDropdownOpen(false)
		}
	}

	const handleClickOutside = (event, ref, setOpen) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setOpen(false)
		}
	}
	const logoutHandler = async () => {
		console.log('working')
		if (userType === 'student') {
			const response = await axios({
				url: `${
					import.meta.env.VITE_REACT_BACKEND_PORT_URL
				}/api/v1/student/logout`,
				method: 'post',
				withCredentials: true,
				headers: { Authorization: `Bearer ${token}` }
			})
		} else if (userType === 'admin') {
			const response = await axios({
				url: `${
					import.meta.env.VITE_REACT_BACKEND_PORT_URL
				}/api/v1/admin/logout`,
				method: 'POST',
				withCredentials: true,
				headers: { Authorization: `Bearer ${token}` }
			})
		}
		logout()
		navigate('/')
	}

	// useEffect(() => {
	// 	const handleClickOutsideMobile = (event) => {
	// 		handleClickOutside(event, userRef, setDropdownOpen)
	// 	}

	// 	document.addEventListener('mousedown', handleClickOutsideMobile)
	// 	document.addEventListener('touchstart', handleClickOutsideMobile)

	// 	return () => {
	// 		document.removeEventListener(
	// 			'mousedown',
	// 			handleClickOutsideMobile
	// 		)
	// 		document.removeEventListener(
	// 			'touchstart',
	// 			handleClickOutsideMobile
	// 		)
	// 	}
	// }, [])
	useEffect(() => {
		const getToken = localStorage.getItem('token')
		setLoading(false)
	}, [])

	const loginHandler = async () => {
		await login()
		toast(' Logged In 👌', {
			hideProgressBar: true,
			autoClose: 3000,
			type: 'success'
		})
	}
	const reduceName = (text) => {
		const words = text.split(/\s+/)
		const firstWord = words[0] || ''
		if (firstWord.length > 10) {
			const result = firstWord.slice(0, 8) + '...'
			return result
		} else {
			return firstWord
		}
	}
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])
	return (
		<div
			className={` sticky top-0 z-40 font-medium  min-h-16 h-full text-gray-800 w-full ${
				isScrolled
					? ' bg-[#081c15] text-white shadow-lg -top-2 '
					: ' '
			} `}
		>
			<div className='relative'>
				<MaxWidthWrapper className='flex justify-between items-center py-4 mx-auto px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl md:py-6  w-full '>
					<a
						href='/'
						className='font-barlow text-2xl sm:text-3xl font-bold '
					>
						<span className='text-[#52b788]'>DLRC</span>
					</a>

					<div className='flex flex-col font-sat h-full -space-y-8 md:hidden'>
						<button
							className='transition-all duration-150 ease-in'
							onClick={() => setMenuBar(!menuBar)}
						>
							{!menuBar && <LuMenu className='w-7 h-7' />}
						</button>
						{menuBar && (
							<div className='absolute z-40 top-0 -left-0 w-full h-screen bg-white'>
								<button
									className=' absolute top-12 right-4 transition-all  duration-150 ease-in'
									onClick={() => setMenuBar(!menuBar)}
								>
									<LuX className='h-7 w-7 stro stroke-[#40916c] stroke-[3] fill-gray-700 text-gray-800  rounded-lg  ' />
								</button>
								<div className=' flex md:hidden flex-col mx-auto items-center space-y-12 justify-start pt-40 text-gray-700 px-6 -py-6 w-full h-screen  bg-gradient-radial  from-purple-100/60 via-purple-100 to-purple-200  '>
									<div className=' flex flex-col space-y-12 items-center justify-center text-base '>
										<a
											href={'/'}
											onClick={() => setMenuBar(false)}
											className='flex items-center text-lg  '
										>
											<HiOutlineDocumentText className='mr-2 xs:mr-3 w-4 h-4 xs:w-5 xs:h-5 ' />
											About
										</a>
										{userType === 'student' && (
											<a
												href={'/user/apply'}
												onClick={() => setMenuBar(false)}
												className='flex items-center text-lg  '
											>
												<HiOutlineDocumentText className='mr-2 xs:mr-3 w-4 h-4 xs:w-5 xs:h-5 ' />
												Apply
											</a>
										)}
										<a
											href={'/rules'}
											onClick={() => setMenuBar(false)}
											className='flex items-center text-lg  '
										>
											<LuInfo className='mr-2 xs:mr-3 w-4 h-4 xs:w-5 xs:h-5 ' />
											Rules
										</a>
										<a
											href={'admin/login'}
											onClick={() => setMenuBar(false)}
											className='flex items-center text-lg  '
										>
											<GrUserAdmin className='mr-2 xs:mr-3 w-4 h-4 xs:w-5 xs:h-5 ' />
											Admin
										</a>
									</div>
									<div className='flex flex-col space-y-6 items-center justify-between z-50'>
										{!loading ? (
											user ? (
												<div className='relative group'>
													<button
														ref={userRef}
														onClick={() => {
															handleDropdownToggle()
														}}
														className='flex items-center py-2 pl-4 pr-2 sm:pl-6 sm:pr-4 md:p-2 space-x-3 bg-gradient-to-tr to-[#52b788]  from-[#74c69d] rounded-xl '
													>
														{/* <LuAtom className="w-8 h-8 p-1 " /> */}
														<p className='font-semibold text-gray-900  md:text-lg lg:text-xl  '>
															{reduceName(user?.fullname)}
														</p>
														<LuChevronDown
															className={` text-black w-4 h-4 transition-all ease-in duration-300 md:h-5 md:w-5 stroke-[1.5px] md:stroke-2 ${
																dropdownOpen ? 'rotate-180' : ''
															} `}
														/>
													</button>
													<div
														className={`  ${
															dropdownOpen ? 'block' : 'hidden'
														} absolute top-12 mt-2 w-48 bg-white rounded-md  border-2 shadow-lg`}
													>
														<ul className='p-2 text-start'>
															{userType === 'student' ? (
																<>
																	<a
																		href={'/user/profile'}
																		onClick={() => {
																			setDropdownOpen(false)
																		}}
																		className='hover:bg-gray-800 cursor-pointer'
																	>
																		<p className='flex w-full px-4 py-2 text-sm hover:bg-gray-200 rounded-lg text-gray-700'>
																			profile
																		</p>
																	</a>
																	<a
																		href={'/user/apply'}
																		onClick={() => {
																			setDropdownOpen(false)
																		}}
																		className='hover:bg-gray-800 cursor-pointer'
																	>
																		<p className='flex px-4 py-2 text-sm hover:bg-gray-200 w-full rounded-lg text-gray-700'>
																			apply
																		</p>
																	</a>
																</>
															) : null}
															<button
																onClick={() => {
																	logoutHandler()
																}}
																className='flex w-full hover:bg-gray-200 rounded-lg cursor-pointer'
															>
																<span className='flex w-full px-4 py-2 text-sm text-red-400'>
																	logout
																</span>
															</button>
														</ul>
													</div>
												</div>
											) : (
												<div className='flex flex-col space-y-8 text-base font-semibold px-3 py-[4px] lg:px-4 '>
													<a
														href='/user/login'
														className=' bg-[#95d5b2] w-max h-10 px-4 md:px-6 flex justify-center items-center text-gray-800 shadow-lg border-2 border-[#40916c] shadow-stone-300 text-base rounded-xl py-1 md:py-2 lg:px-4 '
													>
														Log In
													</a>
												</div>
											)
										) : (
											<div className='flex items-center justify-center bg-[#95d5b2] w-max h-10 px-4 md:px-6 rounded-lg space-x-3 text-base  border-gray-700'>
												<p className='text-gray-900'>Loading</p>
												<div className='animate-spin'>
													<div className='animate-spin rounded-full  h-5 w-5 lg:h-6 lg:w-6 border-[2.5px] border-r-none border-r-white border-transparent'></div>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						)}
					</div>

					<div className=' hidden md:flex space-x-12 items-center justify-center text-base '>
						<Link
							to={'/rules'}
							className='flex items-center text-base hover:text-[#2d6a4f] md:text-lg lg:text-xl '
						>
							<LuInfo className='mr-2 w-4 h-4 md:w-5 md:h-5 ' />
							Rules
						</Link>
						<Link
							to={'/admin/login'}
							className='flex items-center text-base hover:text-[#2d6a4f] md:text-lg lg:text-xl '
						>
							<GrUserAdmin className='mr-2 w-4 h-4 md:w-5 md:h-5 ' />
							Admin
						</Link>
						{userType === 'student' ? (
							<Link
								to={'/user/apply'}
								onClick={() => setMenuBar(false)}
								className='flex items-center text-base hover:text-[#2d6a4f] md:text-lg lg:text-xl  '
							>
								<HiOutlineDocumentText className='mr-2 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ' />
								Apply
							</Link>
						) : (
							<Link
								to={'/user/apply'}
								onClick={() => setMenuBar(false)}
								className='flex items-center text-base hover:text-[#2d6a4f] md:text-lg lg:text-xl  '
							>
								<HiOutlineDocumentText className='mr-2 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ' />
								Apply
							</Link>
						)}
					</div>
					<div className='hidden md:flex items-center  justify-between'>
						{!loading ? (
							user ? (
								<div className='relative group '>
									<button
										ref={userRef}
										onClick={() => {
											handleDropdownToggle()
										}}
										className='flex items-center p-1 md:p-2 md:px-6 space-x-3 bg-gradient-to-tr to-[#52b788] from-[#74c69d] rounded-xl '
									>
										<p className='font-semibold text-gray-900  md:text-lg lg:text-xl  '>
											{reduceName(user?.fullname)}
										</p>
										<LuChevronDown
											className={` text-black w-4 h-4 transition-all ease-in duration-300 md:h-5 md:w-5 stroke-[1.5px] md:stroke-2 ${
												dropdownOpen ? 'rotate-180' : ''
											} `}
										/>
									</button>
									<div
										className={` ${
											dropdownOpen ? 'block' : 'hidden'
										} absolute  right-0 mt-2 w-48 bg-white rounded-md shadow-lg`}
									>
										<ul className='p-2 text-start border border-gray-300 rounded-xl '>
											{userType === 'student' ? (
												<>
													<Link
														to={'/user/profile'}
														onClick={(e) => setDropdownOpen(false)}
														className='hover:bg-gray-800 w-full cursor-pointer'
													>
														<p className='flex w-full md:text-base px-4 py-2 text-sm hover:bg-gray-200 rounded-lg text-gray-700'>
															profile
														</p>
													</Link>
													{/* <a
													href={'/user/apply'}
													onClick={() => setMenuBar(false)}
													className='flex items-center text-base hover:text-[#2d6a4f] md:text-lg lg:text-xl  '
												>
													<HiOutlineDocumentText className='mr-2 w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 ' />
													Apply
												</a> */}
													<Link
														to={'/user/apply'}
														className='hover:bg-gray-800 w-full'
														onClick={(e) => setDropdownOpen(false)}
													>
														<p className='flex px-4 py-2 text-sm md:text-base hover:bg-gray-200 w-full rounded-lg text-gray-700'>
															apply
														</p>
													</Link>
												</>
											) : null}

											<button
												onClick={logoutHandler}
												className='flex w-full hover:bg-gray-200 rounded-lg cursor-pointer'
											>
												<span className='flex w-full px-4 py-2 text-sm md:text-base text-red-400 font-bold'>
													logout
												</span>
											</button>
										</ul>
									</div>
								</div>
							) : (
								<div className='flex  space-x-5 md:space-x-6 text-base font-semibold  '>
									<a
										href='/user/login'
										className=' bg-[#95d5b2] flex justify-center items-center text-gray-800 border-2 border-[#40916c] text-base rounded-xl px-3 py-1 md:py-2 lg:px-4 '
									>
										Log In
									</a>
								</div>
							)
						) : (
							<div className='flex items-center justify-center bg-white shadow-xl shadow-purple-100 border-2 h-10 w-16 rounded-lg space-x-3 text-base  border-purple-100'>
								<div className='animate-spin  rounded-full h-4 w-4 sm:h-5 sm:w-5  border-[2.2px] border-r-none border-r-white border-violet-500'>
									{' '}
									‎{' '}
								</div>
							</div>
						)}
					</div>
				</MaxWidthWrapper>
			</div>
		</div>
	)
}

export default Header
