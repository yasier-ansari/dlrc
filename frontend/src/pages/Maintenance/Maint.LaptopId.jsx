import Search from '../../components/UserSearch'
import AuthHeader from '../../components/AuthHeader'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Modal from '../../components/Modal'
import LaptopList from '../../components/LaptopList'
const MaintIssuedLaptop = () => {
	const { modalPopped, setModalPopped } = useContext(AuthContext)
	return <LaptopList />
}

export default MaintIssuedLaptop
