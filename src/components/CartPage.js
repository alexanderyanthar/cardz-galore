import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SearchResultsPage from './SearchResultsPage';
import { AuthContext, useAuth } from '../contexts/AuthContext';

const CartPage = ({ cartItems, setCartItems, selectedQuantity, setSelectedQuantity }) => {
    const auth = useContext(AuthContext);
    const [itemQuantites, setItemQuantities] = useState({})
    const [updatedQuantities, setUpdatedQuantities] = useState({});

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/cart/${auth.user._id}`);
                setCartItems(response.data);
                // Calculate updated quantities
                const updatedRemainingQuantities = {};
                response.data.forEach((item) => {
                    updatedRemainingQuantities[item.cartId] =
                        item.cardId.sets.find((set) => set._id === item.setId).quantity - item.quantity;
                });
                setUpdatedQuantities(updatedRemainingQuantities);
            } catch (err) {
                console.error('Error fetching cart items', err);
            }
        };
        fetchCartItems();
    }, [auth.user, setCartItems, setUpdatedQuantities]);

    const handleQuantityChange = async (item, newQuantity) => {
        const quantityDifference = newQuantity - item.quantity;
        try {
            const response = await axios.put(`http://localhost:5000/api/cart/${auth.user._id}/${item.cartId}`, {
                quantity: newQuantity,
                quantityDifference: quantityDifference,
            });

            if (response.status === 200) {
                // Update cart items after successful quantity change
                const updatedItems = cartItems.map((cartItem) => {
                    if (cartItem.cartId === item.cartId) {
                        return { ...cartItem, quantity: newQuantity };
                    }
                    return cartItem;
                });
                setCartItems(updatedItems);
                
                setItemQuantities((prevQuantites) => ({
                    ...prevQuantites,
                    [item.cartId]: newQuantity,
                }));

                const updatedRemainingQuantity = item.cardId.sets.find(set => set._id === item.setId).quantity + quantityDifference;

                setUpdatedQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [item.cardId]: updatedRemainingQuantity,
                }));

                await axios.put(`http://localhost:5000/api/update-quantity/${item.cardId._id}/${item.setId}`, {
                    quantity: parseInt(newQuantity),
                    quantityDifference: quantityDifference,
                })
            }
        } catch (err) {
            console.error('Error changing quantity:', err);
        }
    };
    
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
                            </div>
                            <div>
                                <button
                                    onClick={() => handleQuantityChange(item, itemQuantites[item.cartId] - 1)}
                                    disabled={itemQuantites[item.cartId] <= 1}
                                >
                                    Decrease Quantity
                                </button>
                                <button onClick={() => handleQuantityChange(item, itemQuantites[item.cartId] + 1)}>
                                    Increase Quantity
                                </button>
                                <input
                                    type='number'
                                    value={itemQuantites[item.cartId]}
                                    onChange={(e) => handleQuantityChange(item, e.target.value)}
                                />
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
