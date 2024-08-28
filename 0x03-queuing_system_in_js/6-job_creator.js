import kue from 'kue';

// Create a queue instance
const queue = kue.createQueue();

// Define the job data
const notification = {
  phoneNumber: '4153518780',
  message: 'This is the code to verify your account'
};

// Create a job in the queue
const job = queue.create('push_notification_code', notification).save(function (error) {
  if (!error) {
    console.log(`Notification job created: ${job.id}`);
  }
});

// Set up event listeners for job completion and failure
job.on('complete', function () {
  console.log('Notification job completed');
}).on('failed', function () {
  console.log('Notification job failed');
});
