import {
	Route,
	Routes,
	Navigate,
	useLocation
} from 'react-router-dom'
import Profile from './Profile.page'
import Apply from './Apply.page'
import Register from './Register.page'
import Login from './Login.page'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const User = () => {
	const { token, userType, user } = useContext(AuthContext)
	const { state } = useLocation()
	return (
		<Routes>
			<Route
				path='/profile'
				element={
					user ? (
						<Profile />
					) : (
						<Navigate
							to='/user/login'
							state={{ path: location.pathname }}
						/>
					)
				}
			/>
			<Route
				path='/apply'
				element={
					user ? (
						<Apply />
					) : (
						<Navigate
							to='/user/login'
							state={{ path: location.pathname }}
						/>
					)
				}
			/>
			<Route
				path='/register'
				element={
					user ? (
						<Navigate to={state?.path || '/user/profile'} />
					) : (
						<Register />
					)
				}
			/>
			<Route
				path='/login'
				element={
					user ? (
						<Navigate to={state?.path || '/user/profile'} />
					) : (
						<Login />
					)
				}
			/>
		</Routes>
	)
}

export default User
