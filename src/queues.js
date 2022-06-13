const Queue = require('bull');

const userQueue = new Queue(
  'userQueue',
  {
    redis: {
      host: 'redis',
      port: 6379,
      db: 0,
    },
  },
);

module.exports = {
  userQueue,
};
