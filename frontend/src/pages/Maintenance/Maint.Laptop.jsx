import Search from '../../components/UserSearch'
import AuthHeader from '../../components/AuthHeader'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Modal from '../../components/Modal'
import LaptopList from '../../components/LaptopList'
import LaptopIdList from '../../components/LaptopIdList'
const MaintLaptopList = () => {
	const { modalPopped, setModalPopped } = useContext(AuthContext)
	return <LaptopIdList />
}

export default MaintLaptopList
