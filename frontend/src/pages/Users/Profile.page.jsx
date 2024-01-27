import { useContext } from 'react'
import Header from '../../components/Header'
import Modal from '../../components/Modal'
import UserProfile from '../../components/UserProfile'
import { AuthContext } from '../../context/AuthContext'

const Profile = () => {
	const { modalPopped } = useContext(AuthContext)
	return <UserProfile />
}

export default Profile
