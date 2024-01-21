import React, { useContext, useEffect, useRef, useState } from 'react'
import { LuAtom, LuChevronDown } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
const AuthHeader = (props) => {
	const { mainLoading, user, userType, logout, token } =
		useContext(AuthContext)
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const navigate = useNavigate()
	const dropdownRef = useRef(null)
	const handleDropdownToggle = () => {
		setDropdownOpen(!dropdownOpen)
	}
	const handleClickOutside = (event, ref, setOpen) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setOpen(false)
		}
	}
	const logoutHandler = async () => {
		if (userType === 'maintenance') {
			const response = await fetch(
				'http://localhost:8000/api/v1/maintenance/logout',
				{
					method: 'POST',
					credentials: 'include',
					headers: { Authorization: `Bearer ${token}` }
				}
			)
		} else if (userType === 'admin') {
			const response = await fetch(
				'http://localhost:8000/api/v1/admin/logout',
				{
					method: 'POST',
					credentials: 'include',
					headers: { Authorization: `Bearer ${token}` }
				}
			)
		}
		logout()
		navigate('/')
	}
	useEffect(() => {
		const handleClickOutsideDropdown = (event) => {
			handleClickOutside(event, dropdownRef, setDropdownOpen)
		}

		document.addEventListener('mousedown', handleClickOutsideDropdown)

		return () => {
			document.removeEventListener(
				'mousedown',
				handleClickOutsideDropdown
			)
		}
	}, [])
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
	return (
		<div
			className={`sticky top-0 z-40 font-medium  min-h-20 h-full text-gray-800 w-full  `}
		>
			<div
				className={`flex items-center py-4 mx-auto px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl md:py-6  w-full ${
					props.val ? 'justify-between' : 'justify-start'
				} `}
			>
				<a
					href='/'
					className='font-barlow text-2xl sm:text-3xl font-bold '
				>
					<span className='text-[#52b788]'>DLRC</span>
				</a>
				{props.val && (
					<div className='flex items-center justify-between'>
						{!mainLoading ? (
							user ? (
								<div className='relative' ref={dropdownRef}>
									<button
										onClick={handleDropdownToggle}
										className='flex items-center py-2 px-6 space-x-3 bg-gradient-to-tr border-2 border-green-800 to-[#52b788] font-bold  from-[#74c69d] rounded-xl  '
									>
										<p className='font-bold text-black '>
											{reduceName(user?.fullname)}
										</p>
									</button>
									{dropdownOpen ? (
										<div className='absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg'>
											<ul className='p-2 text-start border border-gray-300 rounded-xl '>
												<button
													onClick={logoutHandler}
													className='flex w-full hover:bg-gray-200 rounded-lg cursor-pointer'
												>
													<span className='flex w-full px-4 py-2 text-sm md:text-base text-red-600 font-bold'>
														logout
													</span>
												</button>
											</ul>
										</div>
									) : null}
								</div>
							) : (
								<div className='flex  space-x-5 md:space-x-6 text-base font-semibold  '>
									<Link
										to={`${
											userType === 'admin'
												? '/admin/login'
												: 'maintenance/login'
										}`}
										className=' bg-[#95d5b2] flex justify-center items-center text-gray-800 shadow-lg border-2 border-[#40916c] shadow-stone-300 text-base rounded-xl px-3 py-1 md:py-2 lg:px-4 '
									>
										Log In
									</Link>
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
				)}
			</div>
		</div>
	)
}

export default AuthHeader
