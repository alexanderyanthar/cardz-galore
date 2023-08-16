import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import LogoutButton from './LogoutButton';
import userLogo from '../assets/user-logo.svg';





const AuthButton = () => {
    const auth = useContext(AuthContext);

    if (auth.isAuthenticated) {
        return <LogoutButton />
    } else {
        return <a className='w-1/3 border-2 border-gray-300 transition-colors transition-duration-300 ease-linear hover:border-orange-600 rounded' href="/login">
            <img className='max-w-full w-full object-contain' src={userLogo} alt="user logo" />
        </a>
    }
}

export default AuthButton