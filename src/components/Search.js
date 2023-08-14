import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const auth = useContext(AuthContext);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/cards/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults(response.data);
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
            <div className='flex flex-wrap' key={card._id}>
              {card.sets.map((set, index) => (
                <div className='w-1/4' key={`${card._id}-${index}`}>
                  <img src={searchResults[0].images[0]} alt={card.name} className='w-48 h-64 object-contain' />
                  <h3>{card.name}</h3>
                  <p>Attribute: {card.attribute}</p>
                  <p>Level/Rank: {card.level}</p>
                  <p>ATK/DEF: {card.atk}/{card.def}</p>
                  <p>Set Name: {set.set_name}</p>
                  <p>Set Rarity: {set.set_rarity}</p>
                  <p>Set Price: {set.set_price}</p>
                  <p>Quantity: {card.quantity}</p>
                  <button className='ml-4 bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors px-3 py-2 rounded' onClick={() => handleAddToCart(card)}>Add to cart</button>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No search results found.</p>
        )}


      </div>
    </div>
  );
};

export default Search;
