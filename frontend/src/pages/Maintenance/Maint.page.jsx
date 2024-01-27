import {
	Route,
	Routes,
	Navigate,
	useLocation
} from 'react-router-dom'
import MaintLogin from './MaintLogin.page'
import MaintRegister from './MaintRegister.page'
import MaintUserApproval from './MaintUserApproval.page'
import MaintUserReturn from './MaintUserReturn.page'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import MaintLaptopList from './Maint.Laptop'
import MaintUser from './MaintUser.page'
import AuthHeader from '@/components/AuthHeader'
import Error from '../Error.page'
import MaintIssuedLaptop from './Maint.LaptopId'
const Maint = () => {
	const { user } = useContext(AuthContext)
	const { state } = useLocation()
	return (
		<main className='flex flex-col min-h-screen relative antialiased scroll-smooth '>
			<AuthHeader val={true} />
			<div className='flex-grow flex-1'>
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
						path='/issued'
						element={
							user ? (
								<MaintIssuedLaptop />
							) : (
								<Navigate
									to='/maintenance/login'
									state={{ path: location.pathname }}
								/>
							)
						}
					/>
					{/* <Route
				path='/issued'
				element={
					user ? (
						<MaintLaptopList />
					) : (
						<Navigate
							to='/maintenance/login'
							state={{ path: location.pathname }}
						/>
					)
				}
			/> */}
					<Route
						path='/laptop'
						element={
							user ? (
								<MaintLaptopList />
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
					<Route path='*' element={<Error />} />
				</Routes>
			</div>
		</main>
	)
}

export default Maint
