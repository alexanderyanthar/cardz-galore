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
                const response = await axios.get(`/api/cart/${auth.user._id}`);
                setCartItems(response.data);

                // Calculate updated quantities
                const updatedRemainingQuantities = {};
                response.data.forEach((item) => {
                    updatedRemainingQuantities[item.cartId] =
                        item.cardId.sets.find((set) => set._id === item.setId).quantity;
                });
                setUpdatedQuantities(updatedRemainingQuantities);
            } catch (err) {
                console.error('Error fetching cart items', err);
            }
        };
        fetchCartItems();
    }, [auth.user]);

    const handleQuantityChange = async (cartItem, newQuantity) => {
        // Ensure the new quantity is within the available stock range
        if (newQuantity >= 0 && newQuantity <= updatedQuantities[cartItem.cartId]) {
            try {
                const response = await axios.put(`/api/cart/${auth.user._id}/${cartItem.cartId}`, {
                    quantity: newQuantity,
                });

                if (response.status === 200) {
                    if (newQuantity === 0) {
                        // If the selected quantity is 0, remove the cart item
                        await handleRemoveCartItem(cartItem);
                        return;
                    }

                    // Update cart items after successful quantity change
                    const updatedItems = cartItems.map((item) => {
                        if (item.cartId === cartItem.cartId) {
                            return { ...item, quantity: newQuantity };
                        }
                        return item;
                    });
                    setCartItems(updatedItems);

                    // Display toast notification
                    toast.success('Quantity updated successfully!', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            } catch (err) {
                console.error('Error changing quantity:', err);
            }
        } else {
            // Display an error message if the selected quantity is invalid
            toast.error('Invalid quantity selection!', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    const handleRemoveCartItem = async (item) => {
        try {
            const response = await axios.delete(`/api/cart/${auth.user._id}/${item.cartId}`);
            
            if (response.status === 200) {
                // Remove the cart item from the cartItems state
                const updatedItems = cartItems.filter((cartItem) => cartItem.cartId !== item.cartId);
                setCartItems(updatedItems);

                // Display toast notification
                toast.success('Item removed from cart successfully!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        } catch (err) {
            console.error('Error removing item from cart:', err);
        }
    };

        // Calculate the total price of all items in the cart
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            const set = item.cardId.sets.find(set => set._id === item.setId);
            totalPrice += set.set_price * item.quantity;
        });
        return totalPrice;
    };

    
    return (
        <main>
            <h1 className='text-4xl font-semibold text-center mb-4'>Cart Items</h1>

            {cartItems.length > 0 ? (
                <>
                    <div className="mt-4 text-center">
                        <h3 className='font-semibold'>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
                    </div>
                    <ul className='container mx-auto flex flex-col items-center justify-center w-full lg:w-11/12 lg:max-screen-w-lg lg:flex-row lg:flex-wrap xl:max-screen-w-xl 2xl:max-w-screen-2xl'>
                        {cartItems.map((item) => (
                            <li className='flex w-11/12 items-center m-2 p-2 shadow-lg rounded border-2 sm:w-10/12 md:w-9/12 lg:w-1/2 lg:mx-0 xl:w-5/12 xl:mx-2 2xl:w-5/12' key={item.cartId}>
                                <div className='w-1/2'>
                                    <img className='w-48 h-64 object-contain' src={item.cardId.images[0]} alt={item.cardId.name} />
                                </div>
                                <div className='w-1/2 pl-2'>
                                    <p>Card: {item.cardId.name}</p>
                                    <p>Set: {item.cardId.sets.find(set => set._id === item.setId)?.set_name}</p>
                                    <p className='flex my-2 items-center'>Quantity: 
                                        <div>
                                            <select
                                                className='p-2 rounded shadow-sm'
                                                value={item.quantity}
                                                onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                            >
                                                {Array.from({ length: updatedQuantities[item.cartId] + 1 }).map((_, index) => (
                                                    <option key={index} value={index}>
                                                        {index}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <button 
                                                onClick={() => handleRemoveCartItem(item)}
                                                className='bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors px-1 py-2 rounded'
                                            >
                                                Remove
                                            </button>
                                        </div></p>
                                            <p>Price: {(item.cardId.sets.find(set => set._id === item.setId)?.set_price * item.quantity).toFixed(2)}</p>
                                        </div>
                                
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>Loading cart items...</p>
            )}
            <ToastContainer />
        </main>
    );
};

export default CartPage;
