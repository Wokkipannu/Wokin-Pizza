const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const monk = require('monk');
const cors = require('cors');

require('dotenv').config();

const db = monk(process.env.MONGO_URI);
const Pizzas = db.get('pizzas');

const app = express();

app.use(helmet());
app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use(express.static('./app'));

// Get all pizzas
app.get('/api/pizza', async (req, res, next) => {
  try {
    const pizzas = await Pizzas.find({});
    return res.json(pizzas);
  } catch (error) {
    next(error);
  }
});
// Get a single pizza
app.get('/api/pizza/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pizza = await Pizzas.findOne({ _id: id });
    if (pizza) {
      return res.json(pizza);
    }
    else {
      return res.status(404).json({ message: 'Pizza not found' })
    }
  } catch (error) {
    next(error);
  }
});
// Add a new pizza
app.post('/api/pizza', async (req, res) => {
  const { name, description, toppings, image, thumbnail } = req.body;

  try {
    const newPizza = {
      name,
      description,
      toppings,
      image,
      thumbnail
    };
    const created = await Pizzas.insert(newPizza);
    return res.json(created);
  } catch (error) {
    next(error);
  }
});
// Delete a pizza
app.delete('/api/pizza', async (req, res) => {
  const { id } = req.body;

  try {
    await Pizzas.remove({ _id: id });
    return res.json({ message: 'Pizza removed' });
  } catch (error) {
    next(error);
  }
});
// Update a pizza
app.put('/api/pizza', async (req, res) => {
  const { id, name, toppings, image, thumbnail } = req.body;

  try {
    await Pizzas.update({ _id: id }, {
      name,
      description,
      toppings,
      image,
      thumbnail
    });
    return res.json({ message: 'Pizza updated' });
  } catch (error) {
    next(error);
  }
});

// Error handling
app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  }
  else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '' : error.stack
  });
});

// Define port and listen
const port = process.env.PORT || 3300;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});