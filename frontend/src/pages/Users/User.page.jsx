import { Route, Routes, Navigate } from 'react-router-dom'
import Profile from "./Profile.page"
import Apply from "./Apply.page"
import Register from "./Register.page"
import Login from "./Login.page"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const User = () => {
    const { token, userType } = useContext(AuthContext);
    console.log(token);
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
                        <Navigate to="/user/login" />
                    )
                }
            />
            <Route
                path="/register"
                element={
                    token ?
                        <Navigate to="/user/profile" replace={true} /> : <Register />
                }
            />
            <Route
                path="/login"
                element={
                    token ?
                        <Navigate to='/user/profile' replace={true} /> : <Login />
                }
            />
        </Routes>
    )
}

export default User