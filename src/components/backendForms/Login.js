import React from 'react'
import LoginForm from './LoginForm';
import Header from '../Header';

const Login = () => {
  return (
    <>
      <div className='w-11/12 mx-auto my-0'>
          <h2 className='text-4xl font-bold'>Log In</h2>
          <LoginForm />
          <p>Don't have an account. <a className='font-bold text-xl transition-colors hover:text-blue-600' href="/signup">Sign up</a></p>
      </div>
    </>
  )
}

export default Login