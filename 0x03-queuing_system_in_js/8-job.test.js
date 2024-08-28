import { describe, it, before, after, afterEach } from 'mocha';
import { expect } from 'chai';
import { createQueue } from 'kue';

import createPushNotificationsJobs from './8-job.js';

const queue = createQueue();

describe('Test createPushNotificationsJobs function', function() {
  // Enter test mode before running tests
  before(function () {
    queue.testMode.enter();
  });

  // Clear the queue after each test
  afterEach(function () {
    queue.testMode.clear();
  });

  // Exit test mode after all tests
  after(function () {
    queue.testMode.exit();
  });

  // Test case for non-array input
  it('display an error message if jobs is not an array', function() {
    expect(() => createPushNotificationsJobs('job', queue)).to.throw(Error, 'Jobs is not an array');
  });

  // Test case for job creation
  it('Test whether jobs are created', function() {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account'
      },
    ];

    createPushNotificationsJobs(jobs, queue);

    // Check the number of jobs in the queue
    expect(queue.testMode.jobs.length).to.equal(2);

    // Validate the properties of the first job
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.eql(jobs[0]);

    // Validate the properties of the second job
    expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[1].data).to.eql(jobs[1]);
  });
});
