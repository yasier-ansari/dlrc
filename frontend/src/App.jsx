import { useState } from "react"
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import About from "./pages/Users/About.page"
import User from "./pages/Users/User.page"
import Profile from "./pages/Users/Profile.page"
import Admin from "./pages/Admins/Admin.page"
import AdminUser from "./pages/Admins/AdminUser.page"
import Error from "./pages/Error.page"

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <BrowserRouter>
      {!loading && (
        <div>
          <Routes>

            <Route
              path="/"
              element={
                <About />
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
                <Profile />
              }
            />
            <Route
              path="/user/*"
              element={
                <User />
              }
            />
            <Route
              path="/admin"
              element={
                <AdminUser />
              }
            />
            <Route
              path="/admin/*"
              element={
                <Admin />
              }
            />
          </Routes>
        </div>
      )}
    </BrowserRouter>

  )
}

export default App
