import { useParams } from 'react-router-dom'
import Search from '../../components/UserSearch'
import List from '../../components/UserList'
import AuthHeader from '../../components/AuthHeader'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Modal from '../../components/Modal'
const AdminUser = () => {
	const { id } = useParams()
	const { modalPopped, setModalPopped } = useContext(AuthContext)
	return (
		// <div className='flex flex-col w-full min-h-screen bg-white'>
		// 	<AuthHeader val={true} />
		// 	<main
		// 		className={`flex grow px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 flex-col justify-center mx-auto items-center max-w-7xl w-full h-full py-6 sm:py-8 md:py-10 lg:py-12  space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 sm:w-[90%] md:w-[85%] lg:w-[80%]  relative ${
		// 			modalPopped ? ' opacity-[0.4] ' : ' '
		// 		}  `}
		// 	>
		<List />
		// 	</main>
		// 	{modalPopped && (
		// 		<Modal
		// 			modalPopped={modalPopped}
		// 			setModalPopped={setModalPopped}
		// 		/>
		// 	)}
		// </div>
	)
}

export default AdminUser
