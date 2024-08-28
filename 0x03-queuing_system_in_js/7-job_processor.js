import kue from 'kue';

// Array of blacklisted phone numbers
const blacklist = ['4153518780', '4153518781'];

// Create a queue instance
const queue = kue.createQueue();

// Function to send notifications
function sendNotification(phoneNumber, message, job, done) {
  // Track job progress from 0% to 100%
  job.progress(0, 100);

  // Check if phoneNumber is blacklisted
  if (blacklist.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    return;
  }

  // Update job progress to 50% if not blacklisted
  job.progress(50, 100);

  // Log the notification being sent
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Complete the job
  done();
}

// Process jobs from the 'push_notification_code_2' queue
queue.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
