import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuantityAdjustmentForm = () => {
  let navigate = useNavigate();
  const [cardName, setCardName] = useState('');
  const [newQuantity, setNewQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `/api/cards/adjust-quantity/`,
        { cardName, newQuantity }
      );
      console.log('Quantity adjusted successfully!');

    } catch (err) {
      console.error('Error adjust quantity:', err);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default QuantityAdjustmentForm;
