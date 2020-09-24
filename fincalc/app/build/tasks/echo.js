"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Queue = require("bull");
const redis_1 = require("../util/redis");
const echoQueue = new Queue("echo", { redis: redis_1.workerRedisSettings });
function startProcessingEchoJobs() {
    echoQueue.process(function (job) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = job.data;
            console.log("ECHO: ", data.text);
        });
    });
}
exports.startProcessingEchoJobs = startProcessingEchoJobs;
function submitEchoJob(job, opts) {
    return echoQueue.add(job, opts);
}
exports.submitEchoJob = submitEchoJob;
