import { createClient as initializeRedisClient, print as redisPrint } from 'redis';

const redisClient = initializeRedisClient();

redisClient.on('connect', function() {
  console.log('Redis client connected to the server');
});

redisClient.on('error', function (error) {
  console.log(`Redis client not connected to the server: ${error}`);
});

function setNewSchool(schoolName, value) {
  redisClient.set(schoolName, value, redisPrint);
};

function displaySchoolValue(schoolName) {
  redisClient.get(schoolName, function(err, result) {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(result);
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
