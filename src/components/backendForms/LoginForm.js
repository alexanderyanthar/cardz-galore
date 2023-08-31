import React from 'react'
import axios from 'axios';
import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const LoginForm = () => {
    let navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (formData) => {
        const { username, password } = formData;

        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });

            if (response.status === 200) {
                login(response.data.user);
                navigate('/');

                toast.success('Login successful!');
            }
        } catch (err) {
            console.error("Error logging in:", err);
        }
    }

    const loginFields = [
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Password', name: 'password', type: 'password' },
    ]

  return (
    <>
        <AuthForm fields={loginFields} onSubmit={handleLogin} buttonLabel="Log in" />
    </>
  )
}

export default LoginForm