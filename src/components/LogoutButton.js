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
                navigate('/');
            }
        } catch(err) {
            console.error('Error logging out', err);
        }
    }

  return (
    <button onClick={handleLogout}>Logout</button>
  )
}

export default LogoutButton