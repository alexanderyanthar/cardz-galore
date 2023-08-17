import React from 'react'
import Header from './Header'

const SearchResultsPage = ({ searchResults }) => {
  return (
    <>
        <div className='flex'>
            {searchResults.length > 0 ? (
            searchResults.map((card) => (
                <div className='flex flex-wrap' key={card._id}>
                    {card.sets.map((set, index) => (
                        <div className='w-1/4' key={`${card._id}-${index}`}>
                        <img src={card.images[0]} alt={card.name} className='w-48 h-64 object-contain' />
                        <h3>{card.name}</h3>
                        <p>Attribute: {card.attribute}</p>
                        <p>Level/Rank: {card.level}</p>
                        <p>ATK/DEF: {card.atk}/{card.def}</p>
                        <p>Set Name: {set.set_name}</p>
                        <p>Set Rarity: {set.set_rarity}</p>
                        <p>Set Price: {set.set_price}</p>
                        <p>Quantity: {set.quantity}</p>
                        {/* <button className='ml-4 bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors px-3 py-2 rounded' onClick={() => handleAddToCart(card)}>Add to cart</button> */}
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