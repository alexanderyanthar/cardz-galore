import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import session from 'express-session';
import { Card } from './models/card.mjs';
import { User } from './models/user.mjs';

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
  resave: false,
  saveUninitialized: false,
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

    const passwordMatch = await bcrypt.compare(password, user.password);

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


// app.post('/register', async (req, res) => {
//   const { username, password } = req.body;
//   const saltRounds = 10;
//   const passwordHash = await bcrypt.hash(password, saltRounds);

//   const newUser = new User({
//     username,
//     passwordHash
//   })

//   await newUser.save();
//   res.redirect('/login');
// });

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
      passwordHash
    });
  
    await newUser.save();
  
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
})

app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.send('dashboard works');
})

app.get('/admin', ensureAuthenticated, (req, res) => {
  res.send('admin works');
})

app.put('/api/cards/adjust-quantity/', async (req, res) => {

  try {
    const { cardName, newQuantity } = req.body;
    

    await Card.findOneAndUpdate(
      { name: cardName },
      { quantity: newQuantity },
      { new: true }
    );

    res.status(200).json({ message: 'Quantity adjusted successfully' });
  } catch(err) {
    console.error('Error adjusting quantity:, err');
    res.status(500).json({ erorr: 'Internal Server Error '});
  }
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});