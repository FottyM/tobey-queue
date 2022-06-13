const {Client} = require('pg');
const client = new Client({
  user: 'postgres',
  host: 'db',
  database: 'tobey',
  password: 'postgres',
  port: 5432,
});

module.exports = client;
