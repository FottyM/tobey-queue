const express = require('express');
const client = require('./src/db-client');
const {userQueue} = require('./src/queues');

const app = express();
const port = process.env.PORT || 3000;

let count = 0;

const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  );
`;

app.post('/users', async (req, res) => {
  const user = {
    name: 'John Doe' + count,
    email: 'email',
  };
  count++;
  const job = await userQueue.add(user, {attempts: 3, delay: 1_000});
  res.json({user, jobId: job.id});
});

client.connect(async () => {
  await client.query(createUsersTableQuery);
  app.listen(port, () => console.log(`http://localhost:${port} !`));
});

