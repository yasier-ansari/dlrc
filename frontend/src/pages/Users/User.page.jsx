import { Route, Routes, Navigate } from 'react-router-dom'
import Profile from "./Profile.page"
import Apply from "./Apply.page"
import Register from "./Register.page"
import Login from "./Login.page"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const User = () => {
    const { token, userType, user } = useContext(AuthContext);
    console.log(token);
    return (
        <Routes>
            <Route
                path="/profile"
                element={
                    user ?
                        <Profile /> : <Login />
                }
            />
            <Route
                path="/apply"
                element={
                    user ? (
                        <Apply />
                    ) : (
                        <Login />
                    )
                }
            />
            <Route
                path="/register"
                element={
                    user ?
                        <Navigate to="/user/profile" /> : <Register />
                }
            />
            <Route
                path="/login"
                element={
                    user ?
                        <Navigate to='/user/profile' /> : <Login />
                }
            />
        </Routes>
    )
}

export default User