import { Route, Routes, Navigate } from 'react-router-dom'
import AdminLogin from './AdminLogin.page'
import AdminRegister from './AdminRegister.page'
import AdminUser from './AdminUser.page'
import AdminUserApproval from './AdminUserApproval.page'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Admin = () => {
	const { userType, user } = useContext(AuthContext)
	return (
		<Routes>
			<Route
				path='/user/:id'
				element={
					user ? (
						<AdminUserApproval />
					) : (
						<Navigate
							to='/admin/login'
							replace
							state={{ path: location.pathname }}
						/>
					)
				}
			/>
			<Route
				path='/user'
				element={
					user ? (
						<AdminUser />
					) : (
						<Navigate
							to='/admin/login'
							replace
							state={{ path: location.pathname }}
						/>
					)
				}
			/>
			<Route
				path='/login'
				element={
					user ? (
						<Navigate to={state?.path || '/admin/user'} />
					) : (
						<AdminLogin />
					)
				}
			/>
			<Route
				path='/register'
				element={
					user ? (
						<Navigate to={state?.path || '/admin/user'} />
					) : (
						<AdminRegister />
					)
				}
			/>
		</Routes>
	)
}

export default Admin
