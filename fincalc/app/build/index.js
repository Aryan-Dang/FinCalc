"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cluster = require("cluster");
function __start() {
    if (typeof process.env.FCALC_WORKER_ID === "string" && process.env.FCALC_WORKER_ID.trim().length > 0) {
        require("./worker");
    }
    else {
        require("./server");
    }
}
if (process.argv.indexOf("--fcalc-cluster") >= 0) {
    if (cluster.isMaster) {
        console.log("Server started in clustering mode...");
        const mainFork = cluster.fork(); // The main server
        const workerFork = cluster.fork({ FCALC_WORKER_ID: "c-worker" }); // Our single worker (this is usually just for testing anyway.).
        mainFork.on("exit", (code, signal) => {
            console.log(`main worker ${mainFork.process.pid} exited with code ${code}`);
        });
        workerFork.on("exit", (code, signal) => {
            console.log(`service worker ${workerFork.process.pid} exited with code ${code}`);
        });
    }
    else {
        __start();
    }
}
else {
    __start();
}
