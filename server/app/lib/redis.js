const Redis = require('ioredis');

let redis;

try {
    redis = new Redis(process.env.REDIS_URL);
    redis.on('connect', () => {
        console.log('Connected to Redis');
    });
} catch (error) {
    alert('Unable to connect to Redis');
}

module.exports = redis;
