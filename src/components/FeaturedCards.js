import React from 'react';

const FeaturedCards = ({ randomCards }) => {
  return (
    <div className="flex flex-wrap justify-center mt-8 container mx-auto md:max-w-screen-md lg:max-w-screen-lg lg:w-11/12 xl:max-w-screen-xl 2xl:max-w-screen-2xl">
      {randomCards.map((card, index) => {
        // Randomly select a set from the card's sets array
        const randomSetIndex = Math.floor(Math.random() * card.sets.length);
        const selectedSet = card.sets[randomSetIndex];

        return (
          <div className="flex w-11/12 items-center m-2 p-2 shadow-lg rounded border-2 sm:w-10/12 md:w-9/12 lg:w-1/2 lg:mx-0 xl:w-5/12 xl:mx-2 2xl:w-5/12" key={index}>
            <div className='w-1/2'>
              <img src={card.images[0]} alt={card.name} className="w-48 h-64 object-contain" />
            </div>
            <div className='w-1/2 pl-2'>
              <h3 className="text-lg font-bold mt-2">{card.name}</h3>
              <p className='truncate'>Attribute: {card.attribute}</p>
              <p className='truncate'>Level/Rank: {card.level}</p>
              <p className='truncate'>ATK/DEF: {card.atk}/{card.def}</p>
              {selectedSet && (
                <div>
                  <p>Set: {selectedSet.set_name}</p>
                  <p className='font-bold'>Price: {selectedSet.set_price}</p>
                  <p>Quantity: {selectedSet.quantity}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedCards;
