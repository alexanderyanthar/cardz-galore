import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SearchResultsPage from './SearchResultsPage';
import { AuthContext, useAuth } from '../contexts/AuthContext';

const CartPage = ({ cartItems, setCartItems, selectedQuantity, setSelectedQuantity }) => {
    const auth = useContext(AuthContext);
    const { updatedQuantities, setUpdatedQuantities } = useAuth();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/cart/${auth.user._id}`);
                setCartItems(response.data);
            } catch (err) {
                console.error('Error fetching cart items', err);
            }
        }
        fetchCartItems();
    }, [auth.user])
    console.log('cart items', cartItems)
    
    return (
        <div>
            <h1 className='text-4xl font-semibold text-center mb-4'>Cart Items</h1>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item) => (
                        <li className='flex w-11/12 items-center m-2 p-2 shadow-lg rounded border-2' key={item.cartId}>
                            <div className='w-1/2'>
                                <img className='w-48 h-64 object-contain' src={item.cardId.images[0]} alt={item.cardId.name} />
                            </div>
                            <div className='w-1/2 pl-2'>
                                <p>Card: {item.cardId.name}</p>
                                <p>Set: {item.cardId.sets.find(set => set._id === item.setId)?.set_name}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Quantity Remaining: {item.cardId.sets.find(set => set._id === item.setId)?.quantity}</p>
                            </div>
                       </li>
                    ))}
                </ul>
            ) : (
                <p>Loading cart items...</p>
            )}
        </div>
    )
}

export default CartPage

                        
                        

            //             <ul className='flex flex-col items-center w-full'>
            //     {cartItems.map((item) => (
            //         <li className='flex w-11/12 items-center m-2 p-2 shadow-lg rounded border-2' key={item.cartId}>
            //         </li>
            //     ))}
            // </ul>