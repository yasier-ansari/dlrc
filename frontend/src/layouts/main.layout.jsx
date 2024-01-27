import Header from '@/components/Header'
import { Toaster } from 'react-hot-toast'
const MainLayout = () => {
	return (
		<>
			<main className='flex flex-col min-h-screen relative '>
				<Header />
				<div className='flex-grow flex-1'>{children}</div>
			</main>
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
		</>
	)
}

export default MainLayout
