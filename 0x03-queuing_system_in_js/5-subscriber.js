import { createClient } from 'redis';

const redisClient = createClient();

// Connect to Redis server
redisClient.on('connect', function () {
    console.log('Redis client connected to the server');
});

redisClient.on('error', function (error) {
    console.log(`Redis client not connected to the server: ${error.message}`);
});

// Subscribe to the channel 'holberton school channel'
redisClient.subscribe('holberton school channel');

// Listen for messages on the subscribed channel
redisClient.on('message', function (channel, message) {
    console.log(message);
    if (message === 'KILL_SERVER') {
        // Unsubscribe from the channel and end the Redis client connection
        redisClient.unsubscribe('holberton school channel');
        redisClient.end(true);
    }
});
