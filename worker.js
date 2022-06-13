const client = require('./src/db-client');
const {userQueue} = require('./src/queues');

const concurrency = 2;
const delay = 3_000;

const sleep = ms => new Promise(resolve => {
  setTimeout(resolve, ms);
});

client.connect(err => {
  if (err) {
    console.error(err);
    return;
  }

  userQueue.process('create_user', concurrency, async job => {
    console.log(`Processing job ${job.id}`);

    const {name, email} = job.data;

    await sleep(delay);

    await client.query(`
      INSERT INTO 
        users (name, email) 
        values ($1, $2)`,
    [name, email],
    );
  });

  userQueue.on('error', err => {
    console.error(err);
  });

  userQueue.on('completed', data => {
    console.error(`Job # ${data.id} data: ${JSON.stringify(data.data, null, 2)} completed`);
  });
});

