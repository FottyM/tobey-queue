const express = require('express');
const client = require('./src/db-client');
const {userQueue} = require('./src/queues');

// Create a new express application instance
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json({limit: '1mb'}));

let count = 0;

// Routes
app.get('/users', async (req, res) => {
  const getAllUsersQuery = 'SELECT * FROM users;';
  const users = await client.query(getAllUsersQuery);
  res.json(users.rows);
});

app.get('/users/:id', async (req, res) => {
  const getUserByIdQuery = 'SELECT * FROM users WHERE id = $1;';
  const user = await client.query(getUserByIdQuery, [req.params.id]);

  if (user.rows.length === 0) {
    res.status(404).json({error: 'User not found'});
  }

  res.json(user.rows[0]);
});

app.post('/users', async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email + count,
  };

  count++;

  if (Object.keys(user).length !== 2) {
    res.status(400).json({error: 'Invalid user object'});
    return;
  }

  const job = await userQueue.add('create_user', user, {attempts: 3, delay: 1_000});
  res.json({user, jobId: job.id});
});

// Queries
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  );
`;

// Start the server
client.connect(async () => {
  await client.query(createUsersTableQuery);
  app.listen(port, () => console.log(`http://localhost:${port} !`));
});

