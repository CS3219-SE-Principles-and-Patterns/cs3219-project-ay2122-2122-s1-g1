const redis = require("redis");

const REDISHOST = process.env.REDISHOST || 'localhost';
const REDISPORT = process.env.REDISPORT || 6379;

console.log("REDISTHOST, port: ", REDISHOST, REDISPORT)

const client = redis.createClient(REDISPORT, REDISHOST);
const DEFAULT_EXPIRATION = 86400; // 1 day

client.on("error", function(error) {
  console.error("Please start redis-server")
  console.error(error);
});

module.exports.redisClient = client;
module.exports.DEFAULT_EXPIRATION = DEFAULT_EXPIRATION;
