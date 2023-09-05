import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [updatedQuantities, setUpdatedQuantities] = useState({});

    const checkAuthentication = async () => {
        try {
            const response = await axios.get('https://cardz-galore-979d2881dbf7.herokuapp.com/api/check-authentication');
            if (response.status === 200) {
                setUser(response.data.user)
            } else {
                setUser(null);
            }
            setUser(response.data.user);
        } catch(err) {
            if (err.response && err.response.status === 401) {
                setUser(null);
            } else {
                console.error('Error checking authenticaion:', err);
            }
        }
    }

    useEffect(() => {
        checkAuthentication();
    }, [])

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
        isAuthenticated: !!user,
        updatedQuantities,
        setUpdatedQuantities,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}


