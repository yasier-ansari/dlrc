// import { useParams } from 'react-router-dom'
// const MaintUser = () => {
// 	// const { id } = useParams()
// 	return <div>MaintUser is here</div>
// }
// export default MaintUser
import { useParams } from 'react-router-dom'
import Search from '../../components/UserSearch'
import List from '../../components/UserList'
import AuthHeader from '../../components/AuthHeader'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Modal from '../../components/Modal'
const MaintUser = () => {
	const { modalPopped, setModalPopped } = useContext(AuthContext)
	return (
		<div className='flex flex-col w-full h-full min-h-screen '>
			<AuthHeader val={true} />
			<main
				className={`flex items-center justify-center py-6 sm:py-8 md:py-10 lg:py-12 flex-col space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto w-full relative h-full ${
					modalPopped ? ' opacity-[0.4] ' : ' '
				}  `}
			>
				<List />
			</main>
			{modalPopped && (
				<Modal
					modalPopped={modalPopped}
					setModalPopped={setModalPopped}
				/>
			)}
		</div>
	)
}

export default MaintUser
