import React, { useContext, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import AuthButton from './AuthButton';
import cardzGaloreLogo from '../assets/cardz-galore-logo(1).png';
import Search from './Search';

const Header = ({ searchResults, setSearchResults }) => {
  const auth = useContext(AuthContext);
  let navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='border-b-4'>
      <div className='flex justify-between items-center w-11/12 max-w-screen-xl mx-auto my-0'>
        <div className='w-1/3'>
          <Link to='/'>
            <img className='max-w-full' src={cardzGaloreLogo} alt="cardz galore logo" />
          </Link>
        </div>
        <div className='flex w-1/2 items-center justify-end'>
          <AuthButton />
          
          <button
            className="lg:hidden px-2 py-1 z-10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className={`h-6 w-6 text-gray-600 ${menuOpen ? 'hidden' : 'block'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <ul className={`lg:flex space-x-4 absolute top-0 right-0 bg-white w-full h-full transition-transform transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <li className="py-4 flex justify-between border-b-2 border-gray-400">
                <button
                  className="text-gray-600 hover:text-orange-600 pl-4"
                  onClick={() => setMenuOpen(false)}
                >
                  X
                </button>
                <div className='w-1/2'>
                  <Link className='flex justify-end' to='/'>
                    <img className='w-1/2' src={cardzGaloreLogo} alt="cardz galore logo" />
                  </Link>
                </div>
              </li>
            <li className='px-2 py-4 hover:text-orange-600 transition-colors text-right text-2xl'><a href="#explore">Yu-Gi-Oh!</a></li>
            <li className='px-2 py-4 hover:text-orange-600 transition-colors text-right text-2xl'><a href="#explore">Magic</a></li>
            <li className='px-2 py-4 hover:text-orange-600 transition-colors text-right text-2xl'><a href="#explore">Digimon</a></li>
            <li className='px-2 py-4 hover:text-orange-600 transition-colors text-right text-2xl'><a href="#explore">Flesh and Blood</a></li>
            <li className='px-2 py-4 hover:text-orange-600 transition-colors text-right text-2xl'><a href="#explore">Learn more</a></li>
            <li className='px-2 py-4 hover:text-orange-600 transition-colors text-right text-2xl'>
              {auth.user && auth.user.role === 'admin' && (
                <Link to='/quantity-adjustment'>Adjust Quantity</Link>
              )}
            </li>
            <p className='pt-8 text-center'>Don't have an account? <a className='font-bold text-xl transition-colors hover:text-blue-600' href="/signup">Sign up</a></p>
          </ul>
        </div>
      </div>
      <Search searchResults={searchResults} setSearchResults={setSearchResults} />
    </div>
  );
};

export default Header;
