import React from 'react'

const UserLayout = ({ children }) => {
	return (
		<main className='flex flex-col min-h-screen relative antialiased scroll-smooth '>
			<Header />
			<div className='flex-grow flex-1'>{children}</div>
		</main>
	)
}

export default UserLayout
