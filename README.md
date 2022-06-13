# How to test

0. There are two main files:

   - `sever.js`: the server that receives the requests and sends the responses
   - `worker.js`: the worker that does the backend long background work

1. Make sure you have docker installed and running.
2. Cd to the directory of the project and run `docker-compose up`.
3. With postman, make a many post requests to the following endpoints: http://localhost:3000/users. Do not forget to uncomment this [line](https://github.com/FottyM/tobey-queue/blob/df8e18749f9102b6dd8d657e8f8c8601e0c9e3c0/server.js#L21) in order to create the users table first.
4. Check the db to see that the data is created. with delays depending on the number of requests and the delay time and the max concurrent by which jobs are processed.

## Tech stack

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Postman](https://www.getpostman.com/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/overview/)
- [Redis](https://redis.io/)
- [Bull queue](https://github.com/OptimalBits/bull)
