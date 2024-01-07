import { Route, Routes } from 'react-router-dom'
import MaintLogin from "./MaintLogin.page"
import MaintRegister from "./MaintRegister.page"
import MaintUser from "./MaintUser.page"

const Maint = () => {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <MaintLogin />
                }
            />
            <Route
                path="/register"
                element={
                    <MaintRegister />
                }
            />
            <Route
                path="/user/:id"
                element={
                    <MaintUser />
                }
            />
            <Route
                path="/"
                element={
                    <MaintUser />
                }
            />
        </Routes>
    )
}

export default Maint