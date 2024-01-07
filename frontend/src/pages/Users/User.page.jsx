import { Route, Routes, Navigate } from 'react-router-dom'
import Profile from "./Profile.page"
import Apply from "./Apply.page"
import Register from "./Register.page"
import Login from "./Login.page"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const User = () => {
    const { token, userType } = useContext(AuthContext);
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
                    token ? (
                        <Apply />
                    ) : (
                        // Redirect the user to the login page if not logged in
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/register"
                element={
                    token ?
                        <Register /> : <Navigate to='/apply' />
                }
            />
            <Route
                path="/login"
                element={
                    token ?
                        <Login /> : <Navigate to='/apply' />
                }
            />
        </Routes>
    )
}

export default User