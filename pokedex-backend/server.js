const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost:27017/pokedex', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a Pokemon schema and model
const pokemonSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  type: String,
});
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// Define your CRUD routes (Create, Read, Update, Delete)
app.get('/api/pokemon', async (req, res) => {
  try {
    const pokemonList = await Pokemon.find();
    res.json(pokemonList);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
