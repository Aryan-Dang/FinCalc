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
const redis_1 = require("./redis");
const logging_1 = require("../logging");
const Logger = logging_1.newChildLogger("remote-cache");
class RemoteCache {
    static getKey(key) {
        return "re-cache:" + key;
    }
    static remove(...keys) {
        return __awaiter(this, void 0, void 0, function* () {
            yield redis_1.default.delAsync(...keys);
        });
    }
    static get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const k = this.getKey(key);
            const response = yield redis_1.default.getAsync(k);
            if (response && response.length > 0) {
                try {
                    const obj = JSON.parse(response);
                    return obj;
                }
                catch (e) {
                    Logger.error(e, "Error occurred while getting value from remote cache.");
                }
            }
            return undefined;
        });
    }
    static set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const k = this.getKey(key);
            const json = JSON.stringify(value);
            yield redis_1.default.setAsync(k, json);
        });
    }
    /**
     * Only sets the key if it is not already set.
     */
    static setnx(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const k = this.getKey(key);
            const json = JSON.stringify(value);
            yield redis_1.default.setAsync(k, json, "NX");
        });
    }
    /**
     * Sets with "expires in" in seconds.
     */
    static setex(key, value, seconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const k = this.getKey(key);
            const json = JSON.stringify(value);
            yield redis_1.default.setAsync(k, json, "EX", seconds);
        });
    }
    /**
     * Sets with "expires in" in milliseconds.
     */
    static setpx(key, value, milliseconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const k = this.getKey(key);
            const json = JSON.stringify(value);
            yield redis_1.default.setAsync(k, json, "PX", milliseconds);
        });
    }
}
exports.default = RemoteCache;
