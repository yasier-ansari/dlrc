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
                    user ?
                        <MaintUser /> : <MaintLogin />
                }
            />
            <Route
                path="/register"
                element={
                    user ?
                        <MaintUser /> : <MaintRegister />
                }
            />
            <Route
                path="/user/:id"
                element={
                    user ?
                        <MaintUser /> : <MaintLogin />
                }
            />
            <Route
                path="/"
                element={
                    user ?
                        <MaintUser /> : <MaintLogin />
                }
            />
        </Routes>
    )
}

export default Maint