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
			const response = await fetch(
				`${process.env.REACT_BACKEND_PORT_URL}/api/v1/student/profile`,
				{
					method: 'GET',
					credentials: 'include',
					headers: { Authorization: `Bearer ${accessToken}` }
				}
			)

			if (response.ok) {
				const userProfile = await response.json()
				setUser(userProfile?.data)
			} else {
				setUser(null)
			}
		} catch (error) {
			console.error('Error fetching user profile:', error)
			setUser(null)
		}
	}

	const fetchAdminProfile = async (accessToken) => {
		try {
			const response = await fetch(
				`${process.env.REACT_BACKEND_PORT_URL}/api/v1/admin/profile`,
				{
					method: 'GET',
					credentials: 'include',
					headers: { Authorization: `Bearer ${accessToken}` }
				}
			)

			if (response.ok) {
				const userProfile = await response.json()
				setUser(userProfile?.data)
			} else {
				setUser(null)
				console.log(response)
			}
		} catch (error) {
			console.error('Error fetching user profile:', error)
			setUser(null)
		}
	}
	useEffect(() => {
		setMainLoading(true)
		const token = localStorage.getItem('token')
		if (token) {
			if (userType === 'student') {
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
		const refreshAccessToken = async () => {
			try {
				const response = await fetch(
					user?.userType === 'student' || userType === 'student'
						? `${process.env.REACT_BACKEND_PORT_URL}/api/v1/student/refresh-token`
						: `${process.env.REACT_BACKEND_PORT_URL}/api/v1/admin/refresh-token`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ refreshToken })
					}
				)
				if (response.ok) {
					const newAccessToken = await response.json()
					setLoginData(newAccessToken)
				} else {
					setLoginData(null)
				}
			} catch (error) {
				setLoginData(null)
			}
		}
		const tokenRefreshInterval = setInterval(() => {
			refreshAccessToken()
		}, 3600000 * 12)
		return () => clearInterval(tokenRefreshInterval)
	}, [refreshToken])

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
