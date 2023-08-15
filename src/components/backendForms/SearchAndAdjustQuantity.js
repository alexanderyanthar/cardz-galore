import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
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
      <div className='flex flex-wrap'>
        {searchResults.map((card, cardIndex) => (
          <div className='w-1/4' key={card._id}>
            <img src={card.images[0]} alt={card.name} className='w-48 h-64 object-contain' />
            <h3>{card.name}</h3>
            <p>Attribute: {card.attribute}</p>
            <p>Level/Rank: {card.level}</p>
            <p>ATK/DEF: {card.atk}/{card.def}</p>
            {card.sets.map((set) => (
              <div key={set._id}>
                <p>Set Name: {set.set_name}</p>
                <p>Set Rarity: {set.set_rarity}</p>
                <p>Set Price: {set.set_price}</p>
                <p>Quantity: {set.quantity}</p>
                {auth.user && auth.user.role === 'admin' && (
                  <div>
                    <input
                      type="number"
                      value={set.quantity}
                      onChange={(e) => handleSetQuantityChange(cardIndex, set._id, parseInt(e.target.value))}
                    />
                    <button onClick={() => handleAdjustQuantity(card.name, set._id, set.quantity)}>Adjust Quantity</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchAndAdjustQuantity;
