import kue from 'kue';

// Create a queue instance
const queue = kue.createQueue();

// Define the function to send notifications
function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

// Process jobs from the queue
queue.process('push_notification_code', function (job, done) {
  // Call the sendNotification function with job data
  sendNotification(job.data.phoneNumber, job.data.message);
  
  // Mark the job as done
  done();
});
