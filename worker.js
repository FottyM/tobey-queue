const client = require('./db-client');
const {userQueue} = require('./queues');

const concurrency = 10;
const delay = 1_000;

const sleep = ms => new Promise(resolve => {
	setTimeout(resolve, ms);
});

client.connect(err => {
	if (err) {
		console.error(err);
		return;
	}

	userQueue.process(concurrency, async job => {
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
		console.error(`Job ${JSON.stringify(data, null, 2)} completed`);
	});
});

