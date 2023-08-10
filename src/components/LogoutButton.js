import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
    let navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/logout');

            if (response.status === 200) {
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