import { Route, Routes } from 'react-router-dom'
import Profile from "./Profile.page"
import Apply from "./Apply.page"
import Register from "./Register.page"
import Login from "./Login.page"

const User = () => {
    return (
        <Routes>
            <Route
                path="/profile"
                element={
                    <Profile />
                }
            />
            <Route
                path="/apply"
                element={
                    <Apply />
                }
            />
            <Route
                path="/register"
                element={
                    <Register />
                }
            />
            <Route
                path="/login"
                element={
                    <Login />
                }
            />
        </Routes>
    )
}

export default User