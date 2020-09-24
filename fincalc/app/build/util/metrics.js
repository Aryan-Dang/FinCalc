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
const uuidv4 = require("uuid/v4");
const DAY_MILLIS = 86400000;
function __internalAttachMetridsIds(context, create) {
    if (!context.currentSessionId) {
        const cookieSessionId = context.cookies.get("fcalc-sessid", { signed: true });
        if (cookieSessionId) {
            context.currentSessionId = cookieSessionId;
        }
        else if (create) {
            context.currentSessionId = uuidv4();
            context.cookies.set("fcalc-sessid", context.currentSessionId, { signed: true, httpOnly: true, });
        }
    }
    if (!context.currentVisitorId) {
        const cookieVisitorId = context.cookies.get("fcalc-visiid", { signed: true });
        if (cookieVisitorId) {
            context.currentVisitorId = cookieVisitorId;
        }
        else if (create) {
            context.currentVisitorId = uuidv4();
            context.cookies.set("fcalc-visiid", context.currentVisitorId, {
                signed: true,
                httpOnly: true,
                // visitor cookies currently last for one month.
                expires: new Date(Date.now() + (DAY_MILLIS * 7))
            });
        }
    }
}
function getIPAddress(context) {
    const forwardedFor = context.get("X-Forwarded-For");
    if (forwardedFor && forwardedFor.length > 0) {
        const ips = forwardedFor.split(",");
        return ips[0].trim();
    }
    if (Array.isArray(context.ips) && context.ips[0]) {
        return context.ips[0];
    }
    if (typeof context.request.ip === "string" && context.request.ip.length > 0) {
        return context.request.ip;
    }
    return undefined;
}
exports.getIPAddress = getIPAddress;
/**
 * Attaches Ids for metrics to a context.
 * @param context The context to attach the metrics Ids to.
 * @param next
 */
function attachMetricsIds(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        __internalAttachMetridsIds(context, true);
        yield next();
    });
}
exports.attachMetricsIds = attachMetricsIds;
