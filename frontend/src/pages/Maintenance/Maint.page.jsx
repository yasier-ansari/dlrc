import {
	Route,
	Routes,
	Navigate,
	useLocation
} from 'react-router-dom'
import MaintLogin from './MaintLogin.page'
import MaintRegister from './MaintRegister.page'
import MaintUser from './MaintUser.page'
import MaintUserApproval from './MaintUserApproval.page'
import MaintUserReturn from './MaintUserReturn.page'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Maint = () => {
	const { user } = useContext(AuthContext)
	const { state } = useLocation()
	return (
		<Routes>
			<Route
				path='/issue/:id'
				element={
					user ? (
						<MaintUserApproval />
					) : (
						<Navigate
							to='/maintenance/login'
							state={{ path: location.pathname }}
						/>
					)
				}
			/>
			<Route
				path='/user'
				element={
					user ? (
						<MaintUser />
					) : (
						<Navigate
							to='/maintenance/login'
							state={{ path: location.pathname }}
						/>
					)
				}
			/>
			<Route
				path='/return/:id'
				element={
					user ? (
						<MaintUserReturn />
					) : (
						<Navigate
							to='/maintenance/login'
							state={{ path: location.pathname }}
						/>
					)
				}
			/>
			<Route
				path='/login'
				element={
					user ? (
						<Navigate to={state?.path || '/maintenance/user'} />
					) : (
						<MaintLogin />
					)
				}
			/>
			<Route
				path='/register'
				element={
					user ? (
						<Navigate to={state?.path || '/maintenance/user'} />
					) : (
						<MaintRegister />
					)
				}
			/>

			<Route
				path='/'
				element={
					user ? (
						<Navigate to={state?.path || '/maintenance/user'} />
					) : (
						<Navigate
							to='/maintenance/login'
							state={{ path: location.pathname }}
						/>
					)
				}
			/>
		</Routes>
	)
}

export default Maint
