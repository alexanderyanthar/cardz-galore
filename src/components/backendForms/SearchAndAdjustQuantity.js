import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import searchIcon from '../../assets/search-icon.svg'
import cancelSearch from '../../assets/cancel-search-icon.svg';
import { toast} from 'react-toastify';

const SearchAndAdjustQuantity = () => {
  const auth = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const fetchSuggestions = async (inputValue) => {
    try {
      const response = await axios.get(`/api/cards/suggestions?q=${encodeURIComponent(searchQuery)}`);
      setSearchSuggestions(response.data);
      console.log(searchSuggestions);
    } catch(err) {
      console.error('Error fetchin search suggestions:', err);
    }

  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `/api/cards/search?q=${encodeURIComponent(searchQuery)}`
      );
      setSearchResults(response.data);
      setShowSearchResults(false);
    } catch (err) {
      console.error('Error fetching search results:', err);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    try {
      const response = await axios.get(
        `/api/cards/search?q=${encodeURIComponent(suggestion)}`
      );
      setSearchResults(response.data);
    } catch (err) {
      console.error('Error fetching search results:', err);
    }
  };

  const handleAdjustQuantity = async (cardName, setIndex, newQuantity) => {
    try {
      await axios.put(
        '/api/cards/adjust-quantity',
        { cardName, newQuantity, setIndex }
      );
      toast.success('Quantity adjusted successfully!')
    } catch (err) {
      console.error('Error adjusting quantity:', err);
    }
  };

  const handleSetQuantityChange = (cardIndex, setId, newValue) => {
    setSearchResults((prevResults) => {
      const newResults = prevResults.map((card) => {
        if (card._id === searchResults[cardIndex]._id) {
          const updatedSets = card.sets.map((set) => {
            if (set._id === setId) {
              return { ...set, quantity: newValue };
            }
            return set;
          });
          return { ...card, sets: updatedSets };
        }
        return card;
      });
      return newResults;
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      console.log('Clicked:', e.target); // Log the clicked element
      if (!e.target.closest('.search-container')) {
        setShowSearchResults(false);
        setSearchQuery('');
        setSearchSuggestions([]);
      }
    };


    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <section className='container flex flex-col justify-center items-center mx-auto my-0 relative'>
        <form className='container h-1/2 mt-4 mb-2 flex items-center w-11/12 mx-auto sm:max-w-screen-sm' onSubmit={handleSearchSubmit}>
          <input
            className='relative border-2 border-gray-200 rounded p-2 w-full'
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              fetchSuggestions(e.target.value);  
            }}
          />
          {searchQuery && (
            <button
              className='ml-2 rounded border-2 border-gray-200 transition-colors hover:border-orange-600'
              type='button'
              onClick={() => {
                setSearchQuery('');
                setSearchSuggestions([]); // Clear suggestions
                setSearchResults([]);
              }}
            >
              <img className='w-10' src={cancelSearch} alt="cancel search icon" />
            </button>
          )}
          {searchQuery && (
            <button className='ml-1 rounded border-2 border-gray-200 transition-colors hover:border-orange-600' type='submit'><img className='w-10' src={searchIcon} alt="Search Icon" /></button>
          )}
        </form>
        {/* Search suggestions */}
        {searchSuggestions.length > 0 && (
          <ul className='search-container absolute top-14 mt-2 ml-1 w-full bg-white border border-gray-300rounded shadow-md py-2 px-4 z-50'>
            {searchSuggestions.map((suggestion) => (
              <li className='cursor-pointer p-2 py-4 border-b-2 w-full hover:bg-gray-100' key={suggestion} onClick={() => {
                setSelectedSuggestion(suggestion);
                setSearchSuggestions([]);
                setSearchQuery(suggestion)
                handleSuggestionClick(suggestion);
              }}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        {/* Display search results */}
        <section className='container mx-auto flex w-full justify-center'>
          {searchResults.length > 0 ? (
            searchResults.map((card, cardIndex) => (
              <div className='container flex flex-col items-center justify-center w-full lg:w-11/12 lg:max-w-screen-lg lg:flex-row lg:flex-wrap xl:max-screen-w-xl 2xl:max-w-screen-2xl' key={card._id}>
                {card.sets.map((set, index) => (
                  <div className='flex items-center justify-center m-2 p-2 shadow-lg rounded border-2 sm:w-10/12 md:w-9/12 lg:w-1/2 lg:mx-0 xl:w-5/12 xl:mx-2 2xl:w-5/12' key={`${card._id}-${index}`}>
                    <div className='w-1/2'>
                      <img src={card.images[0]} alt={card.name} className='w-48 h-64 object-contain' />
                    </div>
                    <div className='w-1/2 pl-2'>
                      <h3 className='font-bold'>{card.name}</h3>
                      <p>Attribute: {card.attribute}</p>
                      <p className='truncate'>Level/Rank: {card.level}</p>
                      <p className='truncate'>ATK/DEF: {card.atk}/{card.def}</p>
                      <p className='truncate'>Set: {set.set_name}</p>
                      <p>Rarity: {set.set_rarity}</p>
                      <p>Price: <span className='font-bold'>${set.set_price}</span></p>
                    {auth.user && auth.user.role === 'admin' && (
                      <div>
                        <input
                          className='border-2 border-grey-200 my-2 px-2 rounded w-full'
                          type="number"
                          value={set.quantity}
                          onChange={(e) => {
                            handleSetQuantityChange(cardIndex, set._id, parseInt(e.target.value))
                          }}
                        />
                        <button className='bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors px-1 py-2 rounded' onClick={() => handleAdjustQuantity(card.name, set._id, set.quantity)}>Adjust Quantity</button>
                      </div>
                    )}
                  </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            searchResults.length === 0 ? (
                  <p className='text-2xl font-semibold mt-4'>Search for a card!</p>
            ) : (
              <p>No search results found.</p>
            )
          )}
        </section>
      </section>
    </>
  );
};

export default SearchAndAdjustQuantity;