import React, { useContext, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import AuthButton from './AuthButton';
import cardzGaloreLogo from '../assets/cardz-galore-logo(1).png';
import cardzGaloreAltLogo from "../assets/cardz-galore-logo(2).png";
import Search from './Search';
import exitSymbol from '../assets/exit-symbol.svg';

const Header = ({ searchResults, setSearchResults }) => {
  const auth = useContext(AuthContext);
  let navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const shouldRenderSearchBar = location.pathname === '/' || location.pathname === '/search-results';

  const closeMenu = () => {
    setMenuOpen(false);
  }

  return (
    <div className='shadow-md mb-4'>
      <div className='flex justify-between items-center w-11/12 max-w-screen-xl mx-auto my-0'>
        <div className='w-1/3 md:w-3/12 xl:w-2/12'>
          <Link to='/'>
            <img className='max-w-full' src={cardzGaloreAltLogo} alt="cardz galore logo" />
          </Link>
        </div>
        <div className='flex items-center justify-end'>
          <AuthButton />
          <Link to='/cart-page'>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
          </Link>
          <Link to='/menu'>
            <button
              className="px-2 py-1 z-10"
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
          </Link>
          <ul className={`z-50 space-x-4 absolute top-0 right-0 bg-white w-full h-full transition-transform transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <li className="py-4 flex justify-between border-b-2 border-gray-400">
              <Link to='/' className='flex items-center'>
                <button
                  className="pl-4 text-orange-500"
                  onClick={() => setMenuOpen(false)}
                >
                  <img className='' src={exitSymbol} alt="exit symbol"/>
                </button>
              </Link>
                <div className='w-1/4'>
                  <Link to='/' className='flex justify-end' onClick={closeMenu}>
                    <img className='object-fit lg:w-11/12 xl:w-1/2' src={cardzGaloreAltLogo} alt="cardz galore logo" />
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
                <Link to='/quantity-adjustment' onClick={closeMenu}>Adjust Quantity</Link>
              )}
            </li>
            {!auth.user && (
              <p className='pt-8 text-center'>Don't have an account? <a className='font-bold text-xl transition-colors hover:text-blue-600' href="/signup" onClick={closeMenu}>Sign up</a></p>
            )}
          </ul>
        </div>
      </div>
      {shouldRenderSearchBar && <Search searchResults={searchResults} setSearchResults={setSearchResults} />}
      
    </div>
  );
};

export default Header;
