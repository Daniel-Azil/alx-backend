import { createClient, print } from 'redis';

const client = createClient();

client.on('connect', function() {
  console.log('Redis client connected to the server');
});

client.on('error', function (err) {
  console.log(`Redis client not connected to the server: ${err}`);
});

// Function to create and store the hash
function createHolbertonSchoolsHash() {
  client.hset('HolbertonSchools', 'Portland', '50', print);
  client.hset('HolbertonSchools', 'Seattle', '80', print);
  client.hset('HolbertonSchools', 'New York', '20', print);
  client.hset('HolbertonSchools', 'Bogota', '20', print);
  client.hset('HolbertonSchools', 'Cali', '40', print);
  client.hset('HolbertonSchools', 'Paris', '2', print);
}

// Function to display the hash
function displayHolbertonSchoolsHash() {
  client.hgetall('HolbertonSchools', function(err, result) {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(result);
  });
}

// Call the functions
createHolbertonSchoolsHash();
displayHolbertonSchoolsHash();
