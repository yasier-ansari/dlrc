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
import UserLayout from '@/layouts/users.layout'
import Header from '@/components/Header'
import Error from '../Error.page'

const User = () => {
	const { token, userType, user } = useContext(AuthContext)
	const { state } = useLocation()
	return (
		<main className='flex flex-col min-h-screen relative antialiased scroll-smooth '>
			<Header />
			<div className='flex-grow flex-1'>
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
						path='/'
						element={
							user ? (
								<Navigate to={state?.path || '/user/profile'} />
							) : (
								<Login />
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
					<Route path='*' element={<Error />} />
				</Routes>
			</div>
		</main>
	)
}

export default User
