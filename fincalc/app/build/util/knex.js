"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const knexLib = require("knex");
const index_1 = require("./index");
const logging_1 = require("../logging");
const Logger = logging_1.newChildLogger("knex");
const dbSettings = config.get("db");
const knex = knexLib({
    client: "postgresql",
    connection: dbSettings
});
const logDBQueries = config.get("server.logDBQueries");
const ongoingQueries = new Map;
if (logDBQueries) {
    function logQueryTime(query, obj) {
        const elapsed = process.hrtime(query.start);
        const elapsedms = (elapsed[0] * 1000) + (elapsed[1] / 1000000);
        const [respTime, respTimeUnits] = index_1.reduceTime(elapsedms, "ms");
        const timeString = `${respTime.toFixed(2)} ${respTimeUnits}`;
        Logger.info(`[${timeString}] ${obj.sql}`, { bindings: obj.bindings });
    }
    knex.on("query", (obj) => {
        ongoingQueries.set(obj.__knexQueryUid, {
            start: process.hrtime()
        });
    });
    knex.on("query-error", (error, obj) => {
        const query = ongoingQueries.get(obj.__knexQueryUid);
        if (query) {
            logQueryTime(query, obj);
            ongoingQueries.delete(obj.__knexQueryUid);
        }
    });
    knex.on("query-response", (response, obj, builder) => {
        const query = ongoingQueries.get(obj.__knexQueryUid);
        if (query) {
            logQueryTime(query, obj);
            ongoingQueries.delete(obj.__knexQueryUid);
        }
    });
}
exports.default = knex;
