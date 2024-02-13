import axios from 'axios'
import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext()

function AuthProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem('token'))
	const [refreshToken, setRefreshToken] = useState(
		localStorage.getItem('refreshToken')
	)
	const [user, setUser] = useState(null)
	const [userList, setUserList] = useState(null)
	const [modalPopped, setModalPopped] = useState(false)
	const [userInfo, setUserInfo] = useState(null)
	const [userType, setUserType] = useState(
		localStorage.getItem('userType')
	)
	const [dialogImage, setDialogImage] = useState('')
	const [mainLoading, setMainLoading] = useState(true)

	const logout = () => {
		setToken_(null)
		setRefreshToken_(null)
		setUser(null)
		setUserType_(null)
	}

	const setToken_ = (token) => {
		setToken(token)
		token
			? localStorage.setItem('token', token)
			: localStorage.removeItem('token')
	}

	const setUserType_ = (user) => {
		setUserType(user)
		user
			? localStorage.setItem('userType', user)
			: localStorage.removeItem('userType')
	}

	const setRefreshToken_ = (token) => {
		setRefreshToken(token)
		token
			? localStorage.setItem('refreshToken', token)
			: localStorage.removeItem('refreshToken')
	}

	const setLoginData = (data) => {
		if (data) {
			setToken_(data?.accessToken)
			setRefreshToken_(data?.refreshToken)
			setUserType_(data?.userType)
		} else {
			setToken_(null)
			setRefreshToken_(null)
			setUserType_(null)
		}
	}
	const fetchUserProfile = async (accessToken) => {
		try {
			const response = await axios({
				url: `${import.meta.env.MODE === 'development'
					? import.meta.env.VITE_REACT_BACKEND_PORT_URL_DEV
					: import.meta.env.VITE_REACT_BACKEND_PORT_URL_PROD}/api/v1/student/profile`,
				method: 'get',
				withCredentials: true,

				headers: { Authorization: `Bearer ${accessToken}` }
			})
			const userProfile = response.data
			console.log(userProfile)
			setUser(userProfile?.data)
		} catch (error) {
			if (error.response.status === 402) {
				console.log("working")
				refreshAccessToken()
			}
			setUser(null)
			console.error('Error fetching user profile:', error)
		}
	}

	const fetchAdminProfile = async (accessToken) => {
		try {
			const response = await axios({
				url: `${import.meta.env.MODE === 'development'
					? import.meta.env.VITE_REACT_BACKEND_PORT_URL_DEV
					: import.meta.env.VITE_REACT_BACKEND_PORT_URL_PROD}/api/v1/admin/profile`,
				method: 'get',
				withCredentials: true,

				headers: { Authorization: `Bearer ${accessToken}` }
			})
			const userProfile = response.data
			setUser(userProfile?.data)
		} catch (error) {
			if (error.response.status === 402) {
				console.log("working")
				refreshAccessToken()
			}
			console.error('Error fetching admin profile:', error)
			setUser(null)
		}
	}
	const refreshAccessToken = async () => {
		try {
			const response = await axios({
				url:
					user?.userType === 'student' || userType === 'student'
						? `${import.meta.env.MODE === 'development'
							? import.meta.env.VITE_REACT_BACKEND_PORT_URL_DEV
							: import.meta.env.VITE_REACT_BACKEND_PORT_URL_PROD}/api/v1/student/refresh-token`
						: `${import.meta.env.MODE === 'development'
							? import.meta.env.VITE_REACT_BACKEND_PORT_URL_DEV
							: import.meta.env.VITE_REACT_BACKEND_PORT_URL_PROD}/api/v1/admin/refresh-token`,
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				data: { refreshToken }
			})
			console.log(response, "response here")
			// const newAccessToken = response.data
			// setLoginData(newAccessToken)
		} catch (error) {
			setLoginData(null)
		}
	}
	useEffect(() => {
		setMainLoading(true)
		const token = localStorage.getItem('token')
		if (token) {
			if (userType === 'student') {
				console.log("working")
				fetchUserProfile(token)
			} else if (userType === 'admin' || userType === 'maintenance') {
				fetchAdminProfile(token)
			}
			setMainLoading(false)
		} else {
			setMainLoading(false)
		}
		setMainLoading(false)
	}, [token, setToken])

	useEffect(() => {
		const tokenRefreshInterval = setInterval(() => {
			refreshAccessToken()
		}, 3600000 * 12)
		return () => clearInterval(tokenRefreshInterval)
	}, [refreshToken])
	console.log(import.meta.env.MODE, "env")
	const value = {
		token,
		user,
		modalPopped,
		userList,
		userInfo,
		userType,
		mainLoading,
		refreshToken,
		dialogImage,
		logout,
		setUser,
		setToken,
		setModalPopped,
		setUserList,
		setUserInfo,
		setUserType,
		setMainLoading,
		setToken_,
		setUserType_,
		setRefreshToken_,
		setLoginData,
		setDialogImage
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProvider }
