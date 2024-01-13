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
import ScrollToTop from "./helpers/scrollToTop"
import Access from "./pages/Access.page"
import { Toaster } from 'react-hot-toast'
import MaintUserApproval from "./pages/Maintenance/MaintUserApproval.page"
import MaintUserReturn from "./pages/Maintenance/MaintUserReturn.page"
// import UserLogin from "./components/UserLogin"
function App() {
  const [loading, setLoading] = useState(false);
  const { user, setUser, setToken, token, setUserType, mainLoading, setMainLoading, userType, } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        {!loading && (
          <div className=" transform-cpu lg:transform-gpu scroll-smooth" >
            <ScrollToTop />
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
              {/* <Route
                path="/access"
                element={
                  <Access />
                }
              /> */}
              <Route
                path="/rules"
                element={
                  <Rules />
                }
              />
              <Route
                path="/user"
                element={
                  // userType === "student" ?
                  //   <Profile /> : <Login />
                  userType === "student" ? (
                    <Profile />
                  ) : (userType === "admin" || userType === "maintenance") ? (
                    <Access error={`Uh oh! 😥 It seems like you are trying to reach a student page. This is off-limits for ${userType === 'admin' ? 'admins' : 'Maintenance Team'}`} />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/user/*"
                element={
                  // (userType === "student" ? (
                  // ) : 

                  (userType === "admin" || userType === "maintenance") ? (
                    <Access error={`Uh oh! 😥 It seems like you are trying to reach a student page. This is off-limits for ${userType === 'admin' ? 'admins' : 'Maintenance Team'}`} />
                  ) : (
                    <User />
                  )
                }
              />
              <Route
                path="/admin"
                element={
                  userType === "admin" ? (
                    <AdminUser />
                  ) : (userType === "student" || userType === "maintenance") ? (
                    <Access error={`Uh oh! 😥 It seems like you are trying to reach an admin page. This is off-limits for ${userType === 'student' ? 'students' : 'Maintenance Team'} `} />
                  ) : (
                    <AdminLogin />
                  )
                }
              />
              <Route
                path="/admin/*"
                element={
                  (userType === "student" || userType === "maintenance") ? (
                    <Access error={`Uh oh! 😥 It seems like you are trying to reach an admin page. This is off-limits for ${userType === 'student' ? 'students' : 'Maintenance Team'} `} />
                  ) : (
                    <Admin />
                  )
                }
              />
              <Route
                path="/maintenance"
                element={
                  // userType === "maintenance" ? (
                  <MaintUserReturn />
                  // ) : userType === "student" || userType === "admin" ? (
                  //   <Access error={`Uh oh! 😥 It seems like you are trying to reach an maintenance page. This is off-limits for ${userType} `} />
                  // ) : (
                  //   <MaintLogin />
                  // )
                }
              />
              <Route
                path="/maintenance/*"
                element={
                  (userType === "student" || userType === "admin") ? (
                    <Access error={`Uh oh! 😥 It seems like you are trying to reach an maintenance page. This is off-limits for ${userType} `} />
                  ) :
                    <Maint />
                }
              />
              <Route
                path="*"
                element={
                  <Error />
                }
              />
            </Routes>
          </div>
        )}
      </BrowserRouter>
      <Toaster />
    </>

  )
}

export default App
