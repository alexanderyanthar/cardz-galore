import React from 'react'
import LoginForm from './LoginForm';
import Header from '../Header';

const Login = () => {
  return (
    <>
      <div className='my-0 mx-auto w-11/12 h-screen flex flex-col justify-center items-center'>
          <h2 className='text-4xl font-bold'>Log In</h2>
          <LoginForm />
          <p className='my-8'>Don't have an account. <a className='font-bold text-xl transition-colors hover:text-blue-600' href="/signup">Sign up</a></p>
      </div>
    </>
  )
}

export default Login