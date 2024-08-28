import { createClient } from 'redis';
import express from 'express';
import { promisify } from 'util';

// Create express server on port 1245
const app = express();

// Create Redis client
const redisClient = createClient();

redisClient.on('connect', function() {
  console.log('Redis client connected to the server');
});

redisClient.on('error', function (err) {
  console.log(`Redis client not connected to the server: ${err}`);
});

// Promisify client.get function
const get = promisify(redisClient.get).bind(redisClient);
const set = promisify(redisClient.set).bind(redisClient);

// List of products
const listProducts = [
  { itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4 },
  { itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10 },
  { itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2 },
  { itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5 }
];

// Retrieve item by id
function getItemById(id) {
  return listProducts.find((item) => item.itemId === id);
}

// Reserve stock in Redis
function reserveStockById(itemId, stock) {
  return set(`item.${itemId}`, stock);
}

// Get current reserved stock from Redis
async function getCurrentReservedStockById(itemId) {
  const stock = await get(`item.${itemId}`);
  return stock ? parseInt(stock) : null;
}

// Express routes

// List all products
app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

// Get details of a product by id
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (item) {
    const stock = await getCurrentReservedStockById(itemId);
    const responseItem = {
      itemId: item.itemId,
      itemName: item.itemName,
      price: item.price,
      initialAvailableQuantity: item.initialAvailableQuantity,
      currentQuantity: stock !== null ? stock : item.initialAvailableQuantity,
    };
    res.json(responseItem);
  } else {
    res.json({ status: 'Product not found' });
  }
});

// Reserve a product by id
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId, 10);
  const item = getItemById(itemId);

  if (!item) {
    res.json({ status: 'Product not found' });
    return;
  }

  let currentStock = await getCurrentReservedStockById(itemId);
  if (currentStock !== null) {
    if (currentStock > 0) {
      await reserveStockById(itemId, currentStock - 1);
      res.json({ status: 'Reservation confirmed', itemId });
    } else {
      res.json({ status: 'Not enough stock available', itemId });
    }
  } else {
    if (item.initialAvailableQuantity > 0) {
      await reserveStockById(itemId, item.initialAvailableQuantity - 1);
      res.json({ status: 'Reservation confirmed', itemId });
    } else {
      res.json({ status: 'Not enough stock available', itemId });
    }
  }
});

// Set up express server
const port = 1245;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
