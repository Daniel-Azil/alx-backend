import { createClient, print as redisPrint } from 'redis';

const client = createClient();

client.on('connect', function() {
  console.log('Redis client connected to the server');
});

client.on('error', function(error) {
  console.log(`Redis client not connected to the server: ${error}`);
});

// Set hash key-value pairs in the HolbertonSchools hash
client.hset('HolbertonSchools', 'Portland', '50', redisPrint);
client.hset('HolbertonSchools', 'Seattle', '80', redisPrint);
client.hset('HolbertonSchools', 'New York', '20', redisPrint);
client.hset('HolbertonSchools', 'Bogota', '20', redisPrint);
client.hset('HolbertonSchools', 'Cali', '40', redisPrint);
client.hset('HolbertonSchools', 'Paris', '2', redisPrint);

// Retrieve all elements stored in the HolbertonSchools hash
client.hgetall('HolbertonSchools', function(error, result) {
  if (error) {
    console.log(error);
    throw error;
  }
  console.log(result);
});
