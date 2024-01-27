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
import { Toaster as RHTToaster, toast } from 'react-hot-toast'
import { Toaster } from './components/ui/sonner'
import Header from './components/Header'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	TransformWrapper,
	TransformComponent
} from 'react-zoom-pan-pinch'
import { LuCross } from 'react-icons/lu'
import {
	HiMiniMagnifyingGlassPlus,
	HiMiniMagnifyingGlassMinus,
	HiOutlinePlus
} from 'react-icons/hi2'
import { RxCross2 } from 'react-icons/rx'
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
		userType,
		dialogImage,
		setDialogImage
	} = useContext(AuthContext)
	return (
		<Dialog
			open={dialogImage ? true : false}
			className=' antialiased scroll-smooth flex flex-col min-h-screen relative w-full h-full'
		>
			<RHTToaster
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
						{/* <Route
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
						/> */}
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
						{/* <Route
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
						/> */}
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
						{/* <Route
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
						/> */}
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
			</BrowserRouter>{' '}
			<Toaster />
			<DialogContent className=' xs:max-w-[300px] sm:max-w-xl md:max-w-2xl lg:max-w-3xl  rounded-md mx-auto flex items-center justify-center  p-0'>
				<div className='p-1 rounded-md cursor-grab  '>
					<TransformWrapper>
						{({ zoomIn, zoomOut }) => (
							<>
								<div className=' absolute top-2 right-2 flex items-center justify-center z-30 bg-gray-600 text-white rounded-lg p-1 space-x-2 '>
									<button onClick={() => zoomIn()}>
										<HiMiniMagnifyingGlassPlus className='w-5 h-5 sm:h-6 sm:w-6 md:w-7 md:h-7 lg:w-8 lg:h-8    ' />
									</button>
									<button onClick={() => zoomOut()}>
										<HiMiniMagnifyingGlassMinus className='w-5 h-5 sm:h-6 sm:w-6 md:w-7 md:h-7 lg:w-8 lg:h-8    ' />
									</button>
									<button onClick={() => setDialogImage()}>
										<RxCross2 className='w-5 h-5 sm:h-6 sm:w-6 md:w-7 md:h-7 lg:w-8 lg:h-8    ' />
									</button>
								</div>
								<div className='w-full h-full aspect-video overflow-hidden rounded-lg'>
									<TransformComponent>
										<img
											src={dialogImage}
											className='w-full h-full rounded-lg'
										/>
									</TransformComponent>
								</div>
							</>
						)}
					</TransformWrapper>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default App
