import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const [user, setUser] = useState(null);
    const [userList, setUserList] = useState(null);
    const [modalPopped, setModalPopped] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [userType, setUserType] = useState(localStorage.getItem('userType'));
    const [mainLoading, setMainLoading] = useState(true);

    const logout = () => {
        setToken_(null);
        setRefreshToken_(null)
        setUser(null)
        setUserType_(null)
    };

    const setToken_ = (token) => {
        setToken(token);
        token ? localStorage.setItem('token', token) : localStorage.removeItem('token')
    }

    const setUserType_ = (user) => {
        setUserType(user)
        user ?
            localStorage.setItem('userType', user) : localStorage.removeItem('userType')
    }

    const setRefreshToken_ = (token) => {
        setRefreshToken(token)
        token ? localStorage.removeItem('refreshToken') : localStorage.removeItem('refreshToken')
    }

    const setLoginData = (data) => {
        setToken_(data?.accessToken)
        setUserType_(data?.userType)
    }
    const fetchUserProfile = async (accessToken) => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/student/profile", {
                method: "GET",
                credentials: "include",
                headers: { "Authorization": `Bearer ${accessToken}` },
            });

            if (response.ok) {
                const userProfile = await response.json();
                setUser(userProfile?.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setUser(null);
        }
    }

    const fetchAdminProfile = async (accessToken) => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/admin/profile", {
                method: "GET",
                credentials: "include",
                headers: { "Authorization": `Bearer ${accessToken}` },
            });

            if (response.ok) {
                const userProfile = await response.json();
                setUser(userProfile?.data);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            setUser(null);
        }
    }
    useEffect(() => {
        setMainLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
            console.log("calc")
            if (userType === 'student') {
                fetchUserProfile(token)
            } else {
                fetchAdminProfile(token)
            }
            setMainLoading(false);
        } else {
            setMainLoading(false);
        }
    }, [token, setToken]);

    const value = {
        token,
        user,
        modalPopped,
        userList,
        userInfo,
        userType,
        mainLoading,
        refreshToken,
        logout,
        setUser,
        setToken,
        setModalPopped,
        setUserList,
        setUserInfo,
        setUserType,
        setMainLoading,
        setToken_,
        setUserType_,
        setRefreshToken_,
        setLoginData
    };

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };