const redis = require("redis");
const client = redis.createClient();
const DEFAULT_EXPIRATION = 86400; // 1 day

client.on("error", function(error) {
  console.error("Please start redis-server")
  console.error(error);
});

module.exports.redisClient = client;
module.exports.DEFAULT_EXPIRATION = DEFAULT_EXPIRATION;
