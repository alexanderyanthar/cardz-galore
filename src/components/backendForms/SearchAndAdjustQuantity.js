import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../Header';
const mongoose = require('mongoose');

const SearchAndAdjustQuantity = () => {
  const auth = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:5000/api/cards/search?q=${encodeURIComponent(searchQuery)}`
      );
      setSearchResults(response.data);
    } catch (err) {
      console.error('Error fetching search results:', err);
    }
  };

  const handleAdjustQuantity = async (cardName, setIndex, newQuantity) => {
    try {
      await axios.put(
        'http://localhost:5000/api/cards/adjust-quantity',
        { cardName, newQuantity, setIndex }
      );
      console.log('Quantity adjust successfully');
    } catch (err) {
      console.error('Error adjusting quantity:', err);
    }
  };

  const handleSetQuantityChange = (cardIndex, setId, newValue) => {
    setSearchResults((prevResults) => {
        const newResults = [...prevResults];
        const card = newResults[cardIndex];
        const setToUpdateIndex = card.sets.findIndex((set) => set._id === setId);

        if (setToUpdateIndex !== -1) {
            const newSets = [...card.sets];
            newSets[setToUpdateIndex] = { ...newSets[setToUpdateIndex], quantity: newValue }
            console.log('new sets', newSets[setToUpdateIndex]._id);

            newResults[cardIndex] = { ...card, sets: newSets}
        }

        return newResults;
    })
  };

  return (
    <>
      <div className='flex flex-col justify-center items-center w-11/12 mx-auto my-0'>
        <form onSubmit={handleSearchSubmit}>
          <input
            className='border-2 border-rose-600'
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className='ml-4 bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors px-3 py-2 rounded' type='submit'>Search</button>
        </form>

        {/* Display search results */}
        <div className='flex'>
            {searchResults.length > 0 ? (
            searchResults.map((card) => (
                <div className='flex flex-col items-center w-full' key={card._id}>
                    {card.sets.map((set, index) => (
                        <div className='flex w-11/12 items-center m-2 p-2 shadow-lg rounded border-2' key={`${card._id}-${index}`}>
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
                                  type="number"
                                  value={set.quantity}
                                  onChange={(e) => handleSetQuantityChange(index, set._id, parseInt(e.target.value))}
                                />
                                <button onClick={() => handleAdjustQuantity(card.name, set._id, set.quantity)}>Adjust Quantity</button>
                              </div>
                            )}
                        </div>
                        </div>
                    ))}
                </div>
            ))
            ) : (
            searchResults.length === 0 ? (
                ''
            ) : (
                <p>No search results found.</p>
            )
            )}
        </div>
      </div>
    </>
  );
};

export default SearchAndAdjustQuantity;


