import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import searchIcon from "../assets/search-icon.svg";
import cancelSearch from '../assets/cancel-search-icon.svg';
import SearchResultsPage from './SearchResultsPage';
import { useNavigate } from 'react-router-dom';

const Search = ({ searchResults, setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const auth = useContext(AuthContext);
  let navigate = useNavigate();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/cards/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data);
      console.log(searchResults);
      setSearchQuery('');
      setShowSearchResults(false);
      navigate('/search-results');
    } catch (err) {
      console.error('Error fetching search results:', err);
    }
  };

  const handleAddToCart = async (card) => {
    try {
        const response = await axios.post('http://localhost:5000/add-to-cart', {
        userId: auth.user._id,
        cardId: card._id,
      });
      if (response.status === 200) {
        console.log('Item added to cart successfully');
      }
    } catch (err) {
      console.error('Error adding item to cart:', err);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center w-11/12 mx-auto my-0'>
      <form className='h-1/2 mt-4 mb-2 flex items-center' onSubmit={handleSearchSubmit}>
        <input
          className='border-2 border-gray-200 rounded p-2'
          type="text"
          value={searchQuery}
          placeholder='search for a card'
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className='ml-2 rounded border-2 border-gray-200 transition-colors hover:border-orange-600'
            type='button'
            onClick={() => {
              setSearchQuery('');
              setSearchResults([]);
            }}
          >
            <img className='w-10' src={cancelSearch} alt="cancel search icon" />
          </button>
        )}
        <label className='sr-only'>Search: suggestions appear below</label>
        <button className='ml-1 rounded border-2 border-gray-200 transition-colors hover:border-orange-600' type='submit' onClick={handleSearchSubmit}><img className='w-10' src={searchIcon} alt="Search Icon" /></button>
      </form>
    </div>
  );
};

export default Search;
