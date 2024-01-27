import React, { useContext, useEffect, useState } from 'react'
import AuthHeader from '../../components/AuthHeader'
import { AuthContext } from '../../context/AuthContext'
import Modal from '../../components/Modal'
import { useParams } from 'react-router-dom'
import MaintUserApprovalComp from '../../components/MaintUserApproval'
import MaintUserReturnComp from '../../components/MaintUserReturn'

const MaintUserReturn = () => {
	const { modalPopped, setModalPopped } = useContext(AuthContext)
	const [flag, setFlag] = useState(false)
	const { id } = useParams()
	// useEffect(() => {

	// }, [flag]);
	return <MaintUserReturnComp flag={flag} id={id} />
}

export default MaintUserReturn
