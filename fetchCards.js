const axios = require('axios');
const Card = require('./backend/models/card');
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/cardz_galore';
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    fetchCardData(); // Call the function to fetch and save card data after the database connection is established
  })
  .catch(err => {
    console.log('Error connecting to MongoDB');
    console.log(err);
  });


const cache = {};

const fetchCardData = async () => {
    try {
        if (cache.cards) {
            console.log('Using cahced data...');
            return cache.cards;
        }

        const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        const cardsData = response.data.data;

        const uniqueCardNames = new Map();

        for (const cardData of cardsData) {

            if(!uniqueCardNames.has(cardData.map)) {
                uniqueCardNames.set(cardData.name, true);
                const rarities = Array.isArray(cardData.card_sets) ? cardData.card_sets.map(set => set.set_rarity) : [];
                const imageUrl = cardData.card_images[0]?.image_url || '';


                const card = new Card({
                    name: cardData.name,
                    attribute: cardData.attribute,
                    level: cardData.level,
                    atk: cardData.atk,
                    def: cardData.def,
                    rarity: rarities,
                    images: [imageUrl],
                });

                await card.save();

            }
        }
            

        cache.cards = cardsData;

        console.log('Card data saved to MongoDB successfully!');
    } catch (error) {
        console.error('Error fetching and saving card data:', error);
        throw error;
    } finally {
        mongoose.connection.close();
    }
}
