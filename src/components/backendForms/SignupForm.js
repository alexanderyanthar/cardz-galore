import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';

const SignupForm = () => {
    let navigate = useNavigate();

    const handleSignup = async (formData) => {
        const { username, password } = formData;
        
        try {
            const response = await axios.post('http://localhost:5000/api/signup', { username, password });

            if (response.status === 201) {
                navigate('/');
            }

        } catch (err) {
            console.error('Error signing up:', err);
        }
    };

    const signupFields = [
        { label: 'Username', name: 'username', type: 'text' },
        { label: 'Password', name: 'password', type: 'password' },
    ]

  return (
    <AuthForm fields={signupFields} onSubmit={handleSignup} buttonLabel='Signup' />
  )
}

export default SignupForm