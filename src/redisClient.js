const redis = require("redis");

const client = redis.createClient({
    url: process.env.REDIS_URL
});

client.connect().catch(err => console.error("Couldn't connect to Redis", err));

console.log("Connected to Redis client");

module.exports = client;