import { useCallback, useContext, useEffect, useState } from "react"
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import About from "./pages/Users/About.page"
import User from "./pages/Users/User.page"
import Profile from "./pages/Users/Profile.page"
import Admin from "./pages/Admins/Admin.page"
import AdminUser from "./pages/Admins/AdminUser.page"
import Error from "./pages/Error.page"
import MaintUser from "./pages/Maintenance/MaintUser.page"
import Maint from "./pages/Maintenance/Maint.page"
import Rules from "./pages/Rules.page"
import { AuthContext } from "./context/AuthContext"
import Login from "./pages/Users/Login.page"
import AdminLogin from "./pages/Admins/AdminLogin.page"
import MaintLogin from "./pages/Maintenance/MaintLogin.page"

function App() {
  const [loading, setLoading] = useState(false);
  const { user, setUser, setToken, token, setUserType, userType, refreshToken, setRefreshToken } = useContext(AuthContext);
  const verifyUser = useCallback(() => {
    if (refreshToken) {
      fetch("http://localhost:8000/api/v1/student/refresh-token", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }).then(async response => {
        if (response.ok) {
          const data = await response.json();
          setToken(data.data?.accessToken);
          localStorage.setItem('token', data?.data?.accessToken);
          setRefreshToken(data.data?.refreshToken);
          localStorage.setItem('refreshToken', data?.data?.refreshToken);
        } else {
          setUser(null)
        }
        setTimeout(verifyUser, 5 * 60 * 60 * 1000);
      })
    }
  }, [setToken])

  useEffect(() => {
    verifyUser()
  }, [verifyUser]);
  console.log(token, refreshToken);
  return (
    <BrowserRouter>
      {!loading && (
        <div className="s scroll-smooth" >
          <Routes>

            <Route
              path="/"
              element={
                <About />
              }
            />
            <Route
              path="/about"
              element={
                <About />
              }
            />
            <Route
              path="/rules"
              element={
                <Rules />
              }
            />
            <Route
              path="*"
              element={
                <Error />
              }
            />
            <Route
              path="/user"
              element={
                token ?
                  <Profile /> : <Login />
              }
            />
            <Route
              path="/user/*"
              element={
                token ?
                  <User /> : <Login />
              }
            />
            <Route
              path="/admin"
              element={
                userType === "admin" ?
                  <AdminUser /> : <AdminLogin />
              }
            />
            <Route
              path="/admin/*"
              element={
                userType === "admin" ?
                  <Admin /> : <AdminLogin />
              }
            />
            <Route
              path="/maintenance"
              element={
                userType === "maintenance" ?
                  <MaintUser /> : <MaintLogin />
              }
            />
            <Route
              path="/maintenance/*"
              element={
                userType === "maintenance" ?
                  <Maint /> : <MaintLogin />
              }
            />
          </Routes>
        </div>
      )}
    </BrowserRouter>

  )
}

export default App
