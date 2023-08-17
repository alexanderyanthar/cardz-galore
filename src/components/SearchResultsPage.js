import React from 'react'
import Header from './Header'

const SearchResultsPage = ({ searchResults }) => {
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
                            <p>Quantity: <span className='font-bold'>{set.quantity}</span></p>
                            {/* <button className='ml-4 bg-orange-600 hover:bg-blue-600 hover:text-white transition-colors px-3 py-2 rounded' onClick={() => handleAddToCart(card)}>Add to cart</button> */}
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