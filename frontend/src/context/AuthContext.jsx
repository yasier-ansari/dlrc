import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const [user, setUser] = useState(null);
    const [userList, setUserList] = useState(null);
    const [modalPopped, setModalPopped] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [userType, setUserType] = useState("user");

    const login = (jwtToken) => {
        setIsLoggedIn(true);
        setToken(jwtToken);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setToken(null);
    };

    const value = {
        isLoggedIn,
        token,
        user,
        modalPopped,
        userList,
        userInfo,
        userType,
        refreshToken,
        login,
        logout,
        setUser,
        setToken,
        setModalPopped,
        setUserList,
        setUserInfo,
        setUserType,
        setRefreshToken
    };

    return <AuthContext.Provider value={value} >{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };