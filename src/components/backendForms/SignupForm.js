import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/signup', { username, password });

            if (response.status === 201) {
                navigate('/dashboard');
            }

        } catch (err) {
            console.error('Error signing up:', err);
        }
    };

  return (
    <form onSubmit={handleSubmit}>
        <input 
            type="text"
            placeholder='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
        />
        <button type='submit'>Sign up</button>
    </form>
  )
}

export default SignupForm