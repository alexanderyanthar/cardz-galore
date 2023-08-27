import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

const LogoutSuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/');
        }, 2000);

        return () => clearTimeout(timeout);
    }, [navigate])

  return (
    <div className='z-10 flex justify-center items-center h-screen'>
        <p className='text-center text-2xl'>
            Logout Successful! Redirecting to home page...
        </p>
    </div>
  )
}

export default LogoutSuccessPage