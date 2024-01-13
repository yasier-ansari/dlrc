import { Route, Routes } from 'react-router-dom'
import MaintLogin from "./MaintLogin.page"
import MaintRegister from "./MaintRegister.page"
import MaintUser from "./MaintUser.page"
import MaintUserApproval from "./MaintUserApproval.page"
import MaintUserReturn from "./MaintUserReturn.page"

const Maint = () => {
    return (
        <Routes>
            <Route
                path="/issue/:id"
                element={
                    user ?
                        <MaintUserApproval />
                        : <MaintLogin />
                }
            />
            <Route
                path="/return/:id"
                element={
                    user ?
                        <MaintUserReturn />
                        : <MaintLogin />
                }
            />
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