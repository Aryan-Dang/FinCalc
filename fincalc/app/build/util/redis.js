"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const config = require("config");
const index_1 = require("./index");
const logging_1 = require("../logging");
const Logger = logging_1.newChildLogger("redis");
index_1.promisifyAll(redis.RedisClient.prototype);
index_1.promisifyAll(redis.Multi.prototype);
const redisSettings = config.get("redis");
const redisClientBase = redis.createClient({
    host: redisSettings.host,
    port: redisSettings.port,
    prefix: redisSettings.prefix,
});
exports.workerRedisSettings = {
    host: redisSettings.host,
    port: redisSettings.port,
};
redisClientBase.on("connect", function () {
    Logger.info("Successfully connected to Redis.");
});
redisClientBase.on("error", function (err) {
    Logger.error(err);
});
const redisClient = redisClientBase;
exports.default = redisClient;
