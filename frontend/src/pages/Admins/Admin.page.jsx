import { Route, Routes } from 'react-router-dom'
import AdminLogin from './AdminLogin.page'
import AdminRegister from './AdminRegister.page'
import AdminUser from "./AdminUser.page"
import AdminUserApproval from "./AdminUserApproval.page"

const Admin = () => {
    return (
        <Routes>
            <Route
                path="/user/:id"
                element={
                    <AdminUserApproval />
                }
            />
            {/* <Route
                path="/"
                element={
                    <Admin />
                }
            /> */}
            <Route
                path="/login"
                element={
                    <AdminLogin />
                }
            />
            <Route
                path="/register"
                element={
                    <AdminRegister />
                }
            />

        </Routes>
    )
}

export default Admin