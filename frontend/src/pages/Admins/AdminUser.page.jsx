import { useParams } from 'react-router-dom'
const AdminUser = () => {
    const { id } = useParams();
    return (
        <div>AdminUser is {id} </div>
    )
}

export default AdminUser