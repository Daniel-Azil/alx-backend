import { createClient as initializeConnection } from 'redis';

function connectToRedis() {
  const redisClient = initializeConnection();

  redisClient.on('connect', function() {
    console.log('Redis client connected to the server');
  }).on('error', (err) => {
    console.log(`Redis client not connected to the server: ${err}`);
  });

};

connectToRedis();
