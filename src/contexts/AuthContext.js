import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        // implement your login logic here and set user state.
        setUser(userData);
        console.log('user logged in', userData)
    };

    const logout = () => {
        // IMplenet logout logic
        setUser(null);
        console.log('user logged out');
    };

    const contextValue = {
        user,
        login,
        logout,
        isAuthenticated: !user,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}


