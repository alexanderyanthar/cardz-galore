import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import searchIcon from "../assets/search-icon.svg";
import cancelSearch from '../assets/cancel-search-icon.svg';
import SearchResultsPage from './SearchResultsPage';
import { useNavigate } from 'react-router-dom';
import { toast} from 'react-toastify';


const Search = ({ searchResults, setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]); // New state for suggestions
  const [cartItems, setCartItems] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const auth = useContext(AuthContext);
  let navigate = useNavigate();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    // Check if search query is empty
    if (searchQuery.trim() === '') {
      // Diplay error message
      toast.error('Please enter a search query.', {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
      // Exit function early
      return; 
    }

    try {
      const response = await axios.get(`/api/cards/search?q=${encodeURIComponent(searchQuery)}`);
      console.log(response.data);
      setSearchResults(response.data);
      console.log(searchResults);
      setSearchQuery('');
      setShowSearchResults(false);
      navigate('/search-results');
    } catch (err) {
      console.error('Error fetching search results:', err);
    }
  };

const handleSuggestionClick = async (suggestion) => {
  try {
    const response = await axios.get(`/api/cards/search?q=${encodeURIComponent(suggestion)}`);
    setSearchResults(response.data); // Populate searchResults state with the fetched card details
    navigate('/search-results'); // Navigate to the search results page
  } catch (err) {
    console.error('Error fetching search results:', err);
  }
};


  // New function to fetch suggestions
  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(`/api/cards/suggestions?q=${encodeURIComponent(searchQuery)}`);
      setSuggestions(response.data);
      console.log(response.data);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.search-dropdown')) {
        setShowSearchResults(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <div className='container flex flex-col justify-center items-center w-11/12 mx-auto my-0 relative'>
      <form className='h-1/2 mt-4 mb-2 flex items-center w-full' onSubmit={handleSearchSubmit}>
        <input
          className='border-2 border-gray-200 rounded p-2 w-full'
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
              setSuggestions([]); // Clear suggestions
              setSearchResults([]);
            }}
          >
            <img className='w-10' src={cancelSearch} alt="cancel search icon" />
          </button>
        )}
        <label className='sr-only'>Search: suggestions appear below</label>
        <button className='ml-1 rounded border-2 border-gray-200 transition-colors hover:border-orange-600' type='submit' onClick={handleSearchSubmit}><img className='w-10' src={searchIcon} alt="Search Icon" /></button>
      </form>
      {/* Display suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className='absolute top-14 mt-2 ml-1 w-full bg-white border border-gray-300 rounded shadow-md py-2 px-4 z-50'>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className='cursor-pointer p-2 py-4 border-b-2 w-full hover:bg-gray-100'
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
