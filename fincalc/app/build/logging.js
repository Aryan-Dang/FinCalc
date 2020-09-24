"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
exports.mainLogger = bunyan.createLogger({
    name: "fincalc",
    streams: [
        {
            stream: process.stdout,
            level: "debug"
        }
    ]
});
/**
 * Returns a new logger with the given name.
 * @param name Then name of the new logger.
 */
function newChildLogger(name) {
    return exports.mainLogger.child({ _logger: name });
}
exports.newChildLogger = newChildLogger;
