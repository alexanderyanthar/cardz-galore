import React, { useState } from 'react'
import axios from 'axios';

const QuantityAdjustmentForm = () => {
    const [cardName, setCardName] = useState('');
    const [newQuantity, setNewQuantity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/api/cards/adjust-quantity/`, { cardName, newQuantity });
            console.log('Quantity adjusted successfully!');
        } catch (err) {
            console.error('Error adjust quantity:', err);
        }
    };

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>Card Name:</label>
            <input 
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)} 
            />
        </div>
        <div>
            <label>New Quantity:</label>
            <input 
                type="number"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)} 
            />
        </div>
        <button className='bg-red-500' type='submit'>Adjust Quantity</button>
    </form>
  )
}

export default QuantityAdjustmentForm