import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const QuantityAdjustmentForm = () => {
    let navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [cardName, setCardName] = useState('');
    const [newQuantity, setNewQuantity] = useState('');
    console.log('This is the user', auth.user.role);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:5000/api/cards/adjust-quantity/`, { cardName, newQuantity });
            console.log('Quantity adjusted successfully!');

            if (response.status === 200) {
                navigate('/');
            }
        } catch (err) {
            console.error('Error adjust quantity:', err);
        }
    };


  return (
    auth.user && auth.user.role === 'admin' && (
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
    
  )
}

export default QuantityAdjustmentForm