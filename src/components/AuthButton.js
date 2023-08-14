import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext';
import LogoutButton from './LogoutButton';

const AuthButton = () => {
    const auth = useContext(AuthContext);

    if (auth.isAuthenticated) {
        return <LogoutButton />
    } else {
        return <a className='ml-4 bg-orange-600 hover:bg=blue-600 hover:text-white transition-colors px-3 py-2 rounded' href="/login">Login</a>
    }
}

export default AuthButton