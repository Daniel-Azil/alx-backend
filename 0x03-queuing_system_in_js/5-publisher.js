import { createClient } from 'redis';

const publisher = createClient();

// Connect to Redis server
publisher.on('connect', function () {
    console.log('Redis client connected to the server');
});

publisher.on('error', function (error) {
    console.log(`Redis client not connected to the server: ${error.message}`);
});

// Function to publish a message after a delay
function publishMessage(message, time) {
    // Delay the message publishing by the specified time
    setTimeout(function () {
        console.log(`About to send ${message}`);
        publisher.publish('holberton school channel', message);
    }, time);
}

// Call publishMessage with different messages and delays
publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);
