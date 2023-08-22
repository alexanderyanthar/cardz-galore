import React from 'react'
import SignupForm from './SignupForm'
import Header from '../Header'

const Signup = () => {
  return (
    <div className='my-0 mx-auto w-11/12 h-screen flex flex-col justify-center items-center'>
        <h2 className='text-4xl font-bold mb-4'>Sign Up</h2>
        <SignupForm />
    </div>
  )
}

export default Signup