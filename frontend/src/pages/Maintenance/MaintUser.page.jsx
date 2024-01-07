import { useParams } from 'react-router-dom'
const MaintUser = () => {
    const { id } = useParams();
    return (
        <div>MaintUser is {id} </div>
    )
}

export default MaintUser