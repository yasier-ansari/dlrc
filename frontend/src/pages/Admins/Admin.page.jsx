import { Route, Routes } from 'react-router-dom'
import AdminLogin from './AdminLogin.page'
import AdminRegister from './AdminRegister.page'
import AdminUser from "./AdminUser.page"
import AdminUserApproval from "./AdminUserApproval.page"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const Admin = () => {
    const { userType, user } = useContext(AuthContext)
    return (
        <Routes>
            <Route
                path="/user/:id"
                element={
                    user ?
                        <AdminUserApproval /> : <AdminLogin />
                }
            />
            <Route
                path="/user"
                element={
                    user ?
                        <AdminUser /> : <AdminLogin />
                }
            />
            <Route
                path="/login"
                element={
                    user ?
                        <AdminUser /> : <AdminLogin />
                }
            />
            <Route
                path="/register"
                element={
                    user ?
                        <AdminUser /> : <AdminRegister />
                }
            />

        </Routes>
    )
}

export default Admin