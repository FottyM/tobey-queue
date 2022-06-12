const express = require('express');
const client = require('./db-client');
const {userQueue} = require('./queues');

const app = express();
const port = process.env.PORT || 3000;

let count = 0;
app.post('/users', async (req, res) => {
	const user = {
		name: 'John Doe' + count,
		email: 'email',
	};
	count++;
	const job = await userQueue.add(user, {attempts: 3});
	res.json({user, jobId: job.id});
});

client.connect().then(() => {
	// Client.query('Create table users (id serial primary key, name varchar(255), email varchar(255))').then(() => {});
	app.listen(port, () => console.log(`http://localhost:${port} !`));
});

