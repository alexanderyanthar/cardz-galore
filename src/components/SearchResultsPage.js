import React, { useContext, useState } from 'react'
import Header from './Header'
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';


const SearchResultsPage = ({ searchResults }) => {
    const auth = useContext(AuthContext);
    const [selectedQuantity, setSelectedQuantity] = useState(0);

    const handleAddToCart = async (e, card) => {
        e.preventDefault();
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

    const handleQuantityChange = (e) => {
        setSelectedQuantity(parseInt(e.target.value));
    }



  return (
    <>
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
                            <form onSubmit={(e) => handleAddToCart(e, card)} className='flex items-center mt-4'>
                                <select
                                    className='p-2 rounded shadow-sm mr-2'
                                    value={selectedQuantity}
                                    onChange={handleQuantityChange}
                                >
                                    <option value={0}>0</option>
                                    {Array.from({ length: set.quantity }).map((_, index) => (
                                    <option key={index + 1} value={index + 1}>
                                        {index + 1}
                                    </option>
                                    ))}
                                </select>
                                <div className='p-2 bg-gray-300 rounded shadow-sm'>
                                    of {set.quantity}
                                </div>
                                <button className='bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors px-1 py-2 rounded' type='submit'>Add to cart</button>
                            </form>
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
    </>
  )
}

export default SearchResultsPage