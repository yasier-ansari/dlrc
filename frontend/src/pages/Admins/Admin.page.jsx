import {
	Route,
	Routes,
	Navigate,
	useLocation
} from 'react-router-dom'
import AdminLogin from './AdminLogin.page'
import AdminRegister from './AdminRegister.page'
import AdminUser from './AdminUser.page'
import AdminUserApproval from './AdminUserApproval.page'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Header from '@/components/Header'
import AuthHeader from '@/components/AuthHeader'
import Error from '../Error.page'

const Admin = () => {
	const { userType, user } = useContext(AuthContext)
	const { state } = useLocation()
	return (
		<main className='flex flex-col min-h-screen relative antialiased scroll-smooth '>
			<AuthHeader val={true} />
			<div className='flex-grow flex-1'>
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
						path='/'
						element={
							user ? (
								<Navigate to='/admin/user' />
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
					<Route path='*' element={<Error />} />
				</Routes>
			</div>
		</main>
	)
}

export default Admin
