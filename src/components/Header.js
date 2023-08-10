import React from 'react'
import { Link } from 'react-router-dom'
import Signup from './backendForms/Signup'

const Header = () => {
  return (
    <div className='border-b-4'>
        <div className='flex justify-between items-center w-11/12 max-w-screen-xl mx-auto my-0 h-24'>
      <div>
        <h1 className='text-2xl'>Cardz Galore</h1>
      </div>
      <div className='flex'>
        <ul className='flex justify-between items-center'>
        <li className='px-2 hover:text-orange-600 transition-colors'><a href="#home">Home</a></li>
        <li className='px-2 hover:text-orange-600 transition-colors'><a href="#buy-cards">Buy Cards</a></li>
        <li className='px-2 hover:text-orange-600 transition-colors'><a href="#sell-cards">Sell Cards</a></li>
        <li className='px-2 hover:text-orange-600 transition-colors'><a href="#explore">Explore</a></li>
      </ul>
        {/* <button  className='ml-4 bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors px-3 py-2 rounded'>Sign In</button> */}
        <Link className='ml-4 bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors px-3 py-2 rounded' to='/signup'>Sign up</Link>
        
      </div>
    </div>
    </div>
    
  )
}

export default Header