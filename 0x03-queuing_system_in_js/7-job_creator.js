import kue from 'kue';

// Define the jobs array with data
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account'
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account'
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account'
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account'
  }
];

// Create a queue instance
const queue = kue.createQueue();

// Loop through the jobs array and create jobs in the queue
jobs.forEach((myJob) => {
  // Create a new job in the 'push_notification_code_2' queue
  const job = queue.create('push_notification_code_2', myJob)
    .save((error) => {
      // Log the job ID when the job is created
      if (!error) {
        console.log(`Notification job created: ${job.id}`);
      }
    });

  // Set up event listeners for job completion, failure, and progress
  job.on('complete', () => {
    console.log(`Notification job ${job.id} completed`);
  }).on('failed', (error) => {
    console.log(`Notification job ${job.id} failed: ${error}`);
  }).on('progress', (progress) => {
    console.log(`Notification job ${job.id} ${progress}% complete`);
  });
});
