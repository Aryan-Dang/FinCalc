"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _TIME_UNIT_TO_MS = {
    "ns": 0.000001,
    "ms": 1,
    "seconds": 1000,
    "minutes": 60000,
    "hours": 3600000
};
function reduceTime(value, units) {
    const millis = value * _TIME_UNIT_TO_MS[units];
    if (millis >= 3600000)
        return [millis / 3600000, "hours"];
    if (millis >= 60000)
        return [millis / 60000, "minutes"];
    if (millis >= 1000)
        return [millis / 1000, "seconds"];
    if (millis >= 1)
        return [millis, "ms"];
    return [millis * 1000000, "ns"];
}
exports.reduceTime = reduceTime;
/**
 * Modifies a function so that a callback will always be added
 * as the last argument.
 * NOTE: The generated function must be attached to the same object.
 *       of the function that it is promisifying!.
 */
function promisify(fn, name) {
    const aliasing = fn.name;
    const source = `
    (function () {
        const argsLen = arguments.length;
        const args = new Array(argsLen + 1);
        for (let idx = 0; idx < argsLen; idx++) {
            args[idx] = arguments[idx];
        }
        const self = this;
        return new Promise(function(resolve, reject) {
            args[argsLen] = (function(err, data) {
                if (err) { reject(err); }
                else { resolve(data); }
            });
            self.${aliasing}.apply(self, args);
        });
    })
    `;
    return eval(source);
}
function promisifyAll(obj) {
    const newKeys = {};
    for (const key in obj) {
        const value = obj[key];
        if (typeof value === "function") {
            const _name = key || value.name;
            const _fname = value.name;
            if (!_name || typeof _name !== "string" || _name.length < 1) {
                continue;
            }
            if (!_fname || typeof _fname !== "string" || _fname.length < 1) {
                continue;
            }
            const rename = _name + "Async";
            const promisified = promisify(value, rename);
            newKeys[rename] = promisified;
        }
    }
    for (const key in newKeys) {
        obj[key] = newKeys[key];
    }
    return obj;
}
exports.promisifyAll = promisifyAll;
function copyProperties(src, dest, ...properties) {
    // #FIXME: Maybe I should throw an error if this is false?
    if (typeof src === "object" && typeof dest === "object" && src && dest) {
        for (const prop of properties) {
            if (typeof src[prop] !== "undefined") {
                dest[prop] = src[prop];
            }
        }
    }
}
exports.copyProperties = copyProperties;
/**
 * Only copies properties that already exist in the destination
 * object. For this to work it's important that all values in the
 * destination object be initialized (probably to undefined) before
 * this is called.
 * @param src Source object to copy from.
 * @param dest Destination objec to copy to.
 */
function copyIntoDestination(src, dest) {
    const propertiesList = Object.keys(dest);
    for (const property of propertiesList) {
        if (typeof src[property] !== "undefined") {
            dest[property] = src[property];
        }
    }
}
exports.copyIntoDestination = copyIntoDestination;
function clamp(value, min, max) {
    if (value < min)
        return min;
    if (value > max)
        return max;
    return value;
}
exports.clamp = clamp;
function toQueryString(queryObject) {
    let ret = '';
    if (queryObject) {
        let first = true;
        for (let key in queryObject) {
            if (queryObject[key] === undefined)
                continue;
            if (typeof queryObject[key] === "object")
                continue; // #FIXME: This should probably be an error.
            if (first)
                first = false;
            else
                ret += '&';
            ret += encodeURIComponent(key) + '=' + encodeURIComponent(queryObject[key]);
        }
    }
    return ret;
}
exports.toQueryString = toQueryString;
function addQueryToURL(url, queryObject) {
    let queryStart = url.indexOf('?');
    let hashStart = url.indexOf('#');
    if (hashStart < 0)
        hashStart = url.length;
    if (queryStart < 0)
        queryStart = hashStart;
    const endpoint = url.substr(0, queryStart);
    let query = url.substr(queryStart, hashStart - queryStart);
    const hash = url.substr(hashStart);
    const addon = toQueryString(queryObject);
    if (addon) {
        if (query[0] != '?')
            query = '?' + query;
        if (query.length > 1 && !query.endsWith('&'))
            query += '&' + addon;
        else
            query += addon;
    }
    return endpoint + query + hash;
}
exports.addQueryToURL = addQueryToURL;
