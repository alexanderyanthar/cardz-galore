const axios = require('axios');
const Card = require('./backend/models/card');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load the environment variables from .env file
dotenv.config();


const MONGODB_URI = process.env.MONGODB_URI;
// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    // Call fetchCardData after successfully connecting to the database
    fetchCardData();
    })
    .catch(err => {
    console.log('Error connecting to MongoDB');
    console.log(err);
    });

const fetchCardData = async () => {
    try {
        const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        const cardsData = response.data.data;

        for (const cardData of cardsData) {
            const sets = Array.isArray(cardData.card_sets) ? cardData.card_sets.map(set => ({
                set_name: set.set_name,
                set_code: set.set_code,
                set_rarity: set.set_rarity,
                set_rarity_code: set.set_rarity_code,
                set_price: set.set_price,
            })) : [];

            // Use findOneAndUpdate to update or create card
            await Card.findOneAndUpdate(
                { name: cardData.name },
                {
                    name: cardData.name,
                    attribute: cardData.attribute,
                    level: cardData.level,
                    atk: cardData.atk,
                    def: cardData.def,
                    sets: sets,
                    images: [cardData.card_images[0]?.image_url || ''],
                },
                { upsert: true } // Create if not exists
            );
        }

        console.log('Card data saved/updated to MongoDB successfully!');
    } catch (error) {
        console.error('Error fetching and saving card data:', error);
        throw error;
    } finally {
        mongoose.connection.close();
    }
}