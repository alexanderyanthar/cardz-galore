import React from 'react'

const FeaturedCards = ({ card }) => {
  return (
    <div className="m-4">
        <img src={card.card_images[0].image_url} alt={card.name} className='w-48 h-64 object-contain' />
        <h3 className='text-lg font-bold mt-2'>{card.name}</h3>
        <p>Attribute: {card.attribute}</p>
        <p>Level/Rank: {card.level}</p>
        <p>ATK/DEF: {card.atk}/{card.def}</p>
    </div>
  )
}

export default FeaturedCards