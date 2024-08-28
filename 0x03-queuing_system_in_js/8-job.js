function createPushNotificationsJobs(jobs, queue) {
  // Check if 'jobs' is an array
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  // Iterate over each job in the 'jobs' array
  jobs.forEach((myJob) => {
    // Create a new job in the 'push_notification_code_3' queue with the data from 'myJob'
    let job = queue.create('push_notification_code_3', myJob);

    // Set up event listeners for job status
    job.on('complete', function() {
      console.log(`Notification job ${job.id} completed`);
    }).on('failed', function(error) {
      console.log(`Notification job ${job.id} failed: ${error}`);
    }).on('progress', function(progress, data) {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });

    // Save the job and log the creation
    job.save((error) => {
      if (!error) console.log(`Notification job created: ${job.id}`);
    });
  });
}

// Export the function for use in other files
module.exports = createPushNotificationsJobs;
