const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Card = require('./models/card');

// Enable CORS to allow request from front end
app.use(cors());

// Connect to MongoDB
const MONGODB_URI = 'mongodb://127.0.0.1:27017/cardz_galore';
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connection open');
    })
    .catch(err => {
        console.log("There's been an error");
        console.log(err);
    });

// Backend route to fetch paginated cards data
app.get('/api/cards', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the starting index for pagination
    const startIndex = (page - 1) * limit;

    const cards = await Card.find().skip(startIndex).limit(limit);

    res.json(cards);
  } catch (error) {
    console.error('Error fetching paginated card data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});