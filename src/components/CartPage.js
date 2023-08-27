import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SearchResultsPage from './SearchResultsPage';
import { AuthContext, useAuth } from '../contexts/AuthContext';

const CartPage = ({ cartItems, setCartItems, selectedQuantity, setSelectedQuantity }) => {
    const auth = useContext(AuthContext);
    const { updatedQuantities, setUpdatedQuantities } = useAuth();
    const handleAddToCart = async (e, card, set) => {
        e.preventDefault();
            const cardId = set._id;
            const addToCartQunatity = selectedQuantity[cardId] || 0;

            try {
            const response = await axios.post('http://localhost:5000/add-to-cart', {
                userId: auth.user._id,
                cardId,
                quantity: addToCartQunatity,
            });
            if (response.status === 200) {
                // Update the updatedQuantities state to reflect the changes
                const updatedQuantity = response.data.updatedQuantity;
                setUpdatedQuantities((prevQuantities) => ({
                ...prevQuantities,
                [cardId]: updatedQuantity,
                }));;
                // Update the quantity of the set in the searchResults
                // setSearchResults((prevResults) => {
                // const newResults = prevResults.map((cardItem) => {
                //     if (cardItem._id === card._id) {
                //     const newSets = cardItem.sets.map((setItem) => {
                //         if (setItem._id === cardId) {
                //         return { ...setItem, quantity: updatedQuantity};
                //         }
                //         return setItem;
                //     });
                //     return { ...cardItem, sets: newSets };
                //     }
                //     return cardItem;
                // });
                // return [ ...newResults];
                // });

                // Add item to cart
                setCartItems((prevItems) => [
                    ...prevItems,
                    {
                    card,
                    set,
                    quantity: addToCartQunatity,
                    },
                ]);

                // console.log('cart items', cartItems);

                // Display toast notification
                toast.success('Quantity changed successfully!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
            } catch (err) {
            console.error('Error adding item to cart:', err);
            toast.error('Failed to change quantity. Please try again.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            }
        };

    const handleQuantityChange = (e, setId) => {
        const quantity = parseInt(e.target.value);
        setSelectedQuantity(prevQuantity => ({
        ...prevQuantity,
        [setId]: quantity,
        }));
    };
    // console.log('cart', cartItems)

  return (
    <div className='container mx-auto p-4'>
        <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
        <p className='text-2xl font-semibold text-center p-2'>
            <Link className='cursor-pointer hover:text-orange-600 transition-colors' to='/search-results' element={<SearchResultsPage />}>Search for more cards!</Link>
        </p>
        {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <div>
                {cartItems.map((item, index) => (
                    <div className='flex flex-col items-center w-full' key={index}>
                        <div className='flex w-11/12 items-center m-2 p-2 shadow-lg rounded border-2'>
                            {/* display cart items */}
                            <div className='w-1/2'>
                                <img src={item.card.images[0]} alt={item.card.name} className='w-48 h-64 object-contain' />
                            </div>
                            <div className="w-1/2 pl-2">
                                <p>{item.card.name}</p>
                                <p>{item.card.attribute}</p>
                                <p className='truncate'>Level/Rank: {item.card.level}</p>
                                <p className='truncate'>ATK/DEF: {item.card.atk}/{item.card.def}</p>
                                <p className='truncate'>Set: {item.set.set_name}</p>
                                <p>Rarity: {item.set.set_rarity}</p>
                                <p>Price: <span className='font-bold'>${item.set.set_price}</span></p>
                                <form onSubmit={(e) => handleAddToCart(e, item.card, item.set)} className='flex items-center mt-4'>
                                    <select
                                        className='p-2 rounded shadow-sm mr-2'
                                        value={selectedQuantity[item.set._id]}
                                        onChange={(e) => handleQuantityChange(e, item.set._id)}
                                    >
                                        <option value={0}>0</option>
                                        {Array.from({ length: item.set.quantity }).map((_, index) => (
                                        <option key={index + 1} value={index + 1}>
                                            {index + 1}
                                        </option>
                                        ))}
                                    </select>
                                    <div className='p-2 bg-gray-300 rounded shadow-sm'>
                                        of {item.set.quantity || updatedQuantities[item.set.quantity] || 0}
                                    </div>
                                    <button className='bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors px-2 py-2 rounded' type='submit'>Quantity</button>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default CartPage