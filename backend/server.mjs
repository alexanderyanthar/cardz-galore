import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import session from 'express-session';
import Card from './models/card.mjs';
import { User } from './models/user.mjs';
import { Cart } from './models/cart.mjs';

const app = express();

const secretKey = crypto.randomBytes(32).toString('hex');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}


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

// Enable CORS to allow request from front end
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: secretKey,
  resave: true,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  } catch(err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
})


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

app.get('/api/cards/search', async (req, res) => {
  try {
    const searchQuery = req.query.q;

    const cards = await Card.find({ name: { $regex: searchQuery, $options: 'i' }});

    res.json(cards);
  } catch (err) {
    console.error('Error fetching searched card data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/cards/suggestions', async (req, res) => {
  try {
    const searchQuery = req.query.q;

    // Query the database for suggestions based on the search query
    const suggestions = await Card.find({ name: { $regex: `^${searchQuery}`, $options: 'i' } })
      .select('name') // Select only the 'name' field
      .limit(10);

    const matchedSuggestions = suggestions.map(card => card.name);

    res.json(matchedSuggestions);
  } catch (err) {
    console.error('Error fetching suggestions:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.post('/api/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser =  await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already taken');
        }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
  
    const newUser = new User({
      username,
      passwordHash,
      role: 'user',
    });
  
    await newUser.save();
  
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/api/check-authentication', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).end();
  } else {
    res.sendStatus(204);
  }
})


app.post('/add-to-cart', async (req, res) => {
  const { userId, setId, cardId, quantity} = req.body;

  try {
    let cartItem = await Cart.findOne({ userId, setId });

    if (cartItem) {
      // Cart item already exists, update the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      console.log('making new cart');
      // Create a new cart item
      cartItem = new Cart({
        userId,
        cardId,
        setId,
        quantity,
      });
      await cartItem.save();
    }

    const user = await User.findById(userId);

    if (user) {
      if (!user.cart.includes(cartItem._id)) {
        user.cart.push(cartItem._id);
        await user.save();
      }
    }

    res.status(200).json({ 
      message: 'Item added to cart successfully',
      updatedQuantity: quantity,
    });
  } catch (err) {
    console.error('Error adding item to cart:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


app.get('/api/cart/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate({
      path: 'cart',
      populate: {
        path: 'cardId', // Assuming cardId is the reference field for the Card model
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    const cartItems = user.cart.map((cartItem) => {
      return {
        cartId: cartItem._id,
        cardId: cartItem.cardId,
        setId: cartItem.setId,
        quantity: cartItem.quantity
      };
    });

    res.json(cartItems);
  } catch(err) {
    console.error('Error fetching cart items', err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.put('/api/cart/:userId/:cartItemId', async (req, res) => {
    const { userId, cartItemId } = req.params;
    const { quantity } = req.body;

    try {
        const cartItem = await Cart.findById(cartItemId).populate('cardId');

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        const originalQuantity = cartItem.quantity;
        const quantityDifference = quantity - originalQuantity;

        // Update the cart item's quantity
        cartItem.quantity = quantity;
        await cartItem.save();

        // Update the corresponding card's quantity in the main card database
        const card = cartItem.cardId;
        const setIndex = card.sets.findIndex(set => set._id.toString() === cartItem.setId.toString());

        if (setIndex !== -1) {

            // Save the cart item without updating the card's set quantity
            await cartItem.save();
        }


        res.status(200).json({ message: 'Quantity updated successfully' });
    } catch (err) {
        console.error('Error updating quantity:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/cart/:userId/:cartItemId', async (req, res) => {
    const { userId, cartItemId } = req.params;

    try {
        const user = await User.findByIdAndUpdate(userId, {
            $pull: { cart: cartItemId },
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const deletedCartItem = await Cart.findByIdAndDelete(cartItemId);

        if (!deletedCartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Item removed from cart successfully' });
    } catch (err) {
        console.error('Error removing item from cart:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.put('/api/update-quantity/:cardId/:setId', async (req, res) => {
  const { cardId, setId } = req.params;
  const { quantityDifference } = req.body;

  console.log('cart', req.params);
  console.log('is it cart or card', cardId)

  try {
    const card = await Card.findById(cardId);
    console.log('card', card);
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    const set = card.sets.find(set => set._id.toString() === setId.toString());
    console.log('set', set);
    if (!set) {
      return res.status(404).json({ error: 'Set not found in card' });
    }

    set.quantity -= quantityDifference;
    await card.save();

    res.status(200).json({ message: 'Quantity updated in database' });
  } catch (err) {
    console.error('Error updating quantity in database:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureMessage: true,
}), function (req, res) {
    console.log(req.isAuthenticated());
    res.status(200).json({ message: 'Login successful!', user: req.user});
});

app.post('/api/logout', (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Logout Successful!'});
  });
})


app.put('/api/cards/adjust-quantity/', async (req, res) => {
  try {
    const { cardName, newQuantity, setIndex } = req.body;

    await Card.findOneAndUpdate(
      { name: cardName, 'sets._id': setIndex },
      { $set: { 'sets.$.quantity': newQuantity } },
      { new: true }
    );

    res.status(200).json({ message: 'Quantity adjusted successfully' });
  } catch (err) {
    console.error('Error adjusting quantity:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});