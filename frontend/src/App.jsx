import { useCallback, useContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import About from './pages/Users/About.page'
import User from './pages/Users/User.page'
import Admin from './pages/Admins/Admin.page'
import Error from './pages/Error.page'
import Maint from './pages/Maintenance/Maint.page'
import Rules from './pages/Rules.page'
import { AuthContext } from './context/AuthContext'
import Access from './pages/Access.page'
import { Toaster, toast } from 'react-hot-toast'
function App() {
	const [loading, setLoading] = useState(false)
	const {
		user,
		setUser,
		setToken,
		token,
		setUserType,
		mainLoading,
		setMainLoading,
		userType
	} = useContext(AuthContext)
	return (
		<div className=' antialiased scroll-smooth  '>
			<Toaster
				containerStyle={{}}
				toastOptions={{
					// Define default options
					className: ' font-barlow font-medium md:font-semibold ',
					duration: 5000,
					style: {
						background: '#ffffff',
						color: '#333'
					},
					success: {
						style: {
							border: '2px solid #40916c',
							padding: '16px',
							color: '#333'
						},
						duration: 3000,
						theme: {
							primary: 'blue',
							secondary: 'black'
						},
						iconTheme: {
							primary: ' #40916c ',
							secondary: '#FFFAEE'
						}
					},
					warning: {
						duration: 3000,
						theme: {
							primary: 'blue',
							secondary: 'black'
						},
						iconTheme: {
							primary: '#fb923c',
							secondary: '#FFFAEE'
						}
					},
					error: {
						style: {
							border: '2px solid #ff4b4b',
							padding: '16px',
							color: '#333'
						},
						duration: 3000,
						theme: {
							primary: 'blue',
							secondary: 'black'
						},
						iconTheme: {
							primary: '#ff4b4b',
							secondary: '#FFFAEE'
						}
					}
				}}
				richColors
				position='top-center'
			/>
			<BrowserRouter>
				{!loading && (
					<Routes>
						<Route path='/' element={<About />} />
						<Route path='/about' element={<About />} />
						{/* <Route
                path="/access"
                element={
                  <Access />
                }
              /> */}
						<Route path='/rules' element={<Rules />} />
						<Route
							path='/user'
							element={
								// userType === "student" ?
								//   <Profile /> : <Login />
								// userType === 'student' ? (
								// 	<Profile />
								// ) : userType === 'admin' ||
								//   userType === 'maintenance' ? (
								// 	<Access
								// 		error={`Uh oh! 😥 It seems like you are trying to reach a student page. This is off-limits for ${
								// 			userType === 'admin'
								// 				? 'admins'
								// 				: 'Maintenance Team'
								// 		}`}
								// 	/>
								// ) : (
								// 	<Login />
								// )
								<User />
							}
						/>
						<Route
							path='/user/*'
							element={
								// (userType === "student" ? (
								// ) :

								userType === 'admin' || userType === 'maintenance' ? (
									<Access
										error={`Uh oh! 😥 It seems like you are trying to reach a student page. This is off-limits for ${
											userType === 'admin'
												? 'admins'
												: 'Maintenance Team'
										}`}
									/>
								) : (
									<User />
								)
							}
						/>
						<Route
							path='/admin'
							element={
								// userType === 'admin' ? (
								// 	<AdminUser />
								// ) : userType === 'student' ||
								//   userType === 'maintenance' ? (
								// 	<Access
								// 		error={`Uh oh! 😥 It seems like you are trying to reach an admin page. This is off-limits for ${
								// 			userType === 'student'
								// 				? 'students'
								// 				: 'Maintenance Team'
								// 		} `}
								// 	/>
								// ) : (
								// 	<AdminLogin />
								// )
								<Admin />
							}
						/>
						<Route
							path='/admin/*'
							element={
								userType === 'student' ||
								userType === 'maintenance' ? (
									<Access
										error={`Uh oh! 😥 It seems like you are trying to reach an admin page. This is off-limits for ${
											userType === 'student'
												? 'students'
												: 'Maintenance Team'
										} `}
									/>
								) : (
									<Admin />
								)
							}
						/>
						<Route
							path='/maintenance'
							element={
								// userType === "maintenance" ? (
								// <MaintUserReturn />
								// ) : userType === "student" || userType === "admin" ? (
								//   <Access error={`Uh oh! 😥 It seems like you are trying to reach an maintenance page. This is off-limits for ${userType} `} />
								// ) : (
								//   <MaintLogin />
								// )
								<Maint />
							}
						/>
						<Route
							path='/maintenance/*'
							element={
								userType === 'student' || userType === 'admin' ? (
									<Access
										error={`Uh oh! 😥 It seems like you are trying to reach an maintenance page. This is off-limits for ${userType} `}
									/>
								) : (
									<Maint />
								)
							}
						/>
						<Route path='*' element={<Error />} />
					</Routes>
				)}
			</BrowserRouter>
		</div>
	)
}

export default App
