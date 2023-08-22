import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const LogoutButton = () => {
    let navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/logout');

            if (response.status === 200) {
                logout();
                navigate('/logout-success');
            }
        } catch(err) {
            console.error('Error logging out', err);
        }
    }

  return (
    <button className='ml-4 bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors px-3 py-2 rounded' onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton