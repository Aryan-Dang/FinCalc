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
const logging_1 = require("../logging");
const FileSystem = require("mz/fs");
function getDateOrNull(s) {
    if (s) {
        const date = new Date(s);
        if (Number.isFinite(date.getTime()))
            return date;
        return null;
    }
    return null;
}
const Logger = logging_1.newChildLogger("app:httpcache");
/**
 * Returns true if the client has a fresh version (If-Modified-Since) or too new a version (If-Unmodified-Since) of the resource.
 * The request should not continue if this method returns true.
 * @param context
 * @param path
 */
function modifiedTimeIsFreshOrError(context, path) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: I want to add some sort caching in here so that I don't keep hitting stat so much.
        // Succeeds if the Last-Modified date of the distant resource is more recent than the one given in this header.
        // If the request has not been modified since, the response will be a 304 without any body.
        const ifModifiedSince = getDateOrNull(context.get("If-Modified-Since"));
        // Succeeds if the Last-Modified date of the distant resource is older or the same than the one given in this header.
        // If the request has been modified after the given date, the response will be a 412 (Precondition Failed) error.
        const ifUnmodifiedSince = getDateOrNull(context.get("If-Unmodified-Since"));
        if (!ifModifiedSince && !ifUnmodifiedSince) {
            return false;
        }
        try {
            const stat = yield FileSystem.stat(path);
            if (stat && stat.isFile()) {
                const modifiedTime = stat.mtime.getTime();
                context.set("Last-Modified", stat.mtime.toUTCString());
                if (ifModifiedSince && (ifModifiedSince.getTime() > modifiedTime)) {
                    // The resource's modified time is older than If-Modified-Since.
                    context.response.status = 304;
                    return true;
                }
                if (ifUnmodifiedSince && (ifUnmodifiedSince.getTime() < modifiedTime)) {
                    // The resource's modified time is more recent than If-Unmodified-Since.
                    context.response.status = 412;
                    return true;
                }
            }
        }
        catch (e) {
            // #FIXME: I just ignore this for now but I really shouldn't. I could shortcircuit the request here somehow.
        }
        return false;
    });
}
exports.modifiedTimeIsFreshOrError = modifiedTimeIsFreshOrError;
// export default async function httpCache(context: Context, next: () => Promise<any>) {
//     await next();
//     const { response } = context;
//     const body = response.body;
//     if (body && body instanceof Stream) {
//         const path = (body as any)["path"];
//         if (path && typeof path === "string") {
//         }
//     }
// } 
