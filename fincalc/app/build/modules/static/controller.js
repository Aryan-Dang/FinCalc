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
const config = require("config");
const serve = require("koa-static");
const Path = require("path");
const http_cache_1 = require("../../util/http-cache");
const file_uploads_1 = require("../util/file-uploads");
const staticAssetsRoot = config.get("app.staticAssets.root");
const staticAssetsRootAbsolute = Path.resolve(staticAssetsRoot);
const staticAssetsOptions = {
    maxage: config.get("app.staticAssets.maxAge"),
    gzip: config.get("app.staticAssets.gzip")
};
const staticAssetServe = serve(staticAssetsRoot, staticAssetsOptions);
const NULL_NEXT = () => null;
function staticAssets(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const resource = context.params["resource"];
        // #TODO: I want to start using ETags at some point here since they are better?
        const fullResourcePath = Path.join(staticAssetsRootAbsolute, resource);
        if (!(yield http_cache_1.modifiedTimeIsFreshOrError(context, fullResourcePath))) {
            const oldPath = context.path;
            context.path = resource;
            yield staticAssetServe(context, NULL_NEXT);
            context.path = oldPath;
            context.set("Cache-Control", "immutable, max-age 86400");
        }
    });
}
exports.staticAssets = staticAssets;
// --- UPLOADS
const publicUploadsRoot = Path.join(file_uploads_1.uploadDir, "public");
const publicUploadsRootAbsolute = Path.resolve(publicUploadsRoot);
const publicUploadsOptions = {
    maxage: config.get("app.staticAssets.maxAge"),
    gzip: config.get("app.staticAssets.gzip")
};
const publicUploadsServe = serve(publicUploadsRoot, publicUploadsOptions);
// #TODO: Unlike everything else all of these files are actually immutable and should be cahed for a
//        long as fuck time.
function publicUploadAssets(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const resource = context.params["resource"];
        // #TODO: I want to start using ETags at some point here since they are better?
        const fullResourcePath = Path.join(publicUploadsRootAbsolute, resource);
        if (!(yield http_cache_1.modifiedTimeIsFreshOrError(context, fullResourcePath))) {
            const oldPath = context.path;
            context.path = resource;
            yield publicUploadsServe(context, NULL_NEXT);
            context.path = oldPath;
            context.set("Cache-Control", "immutable, max-age 86400");
        }
    });
}
exports.publicUploadAssets = publicUploadAssets;
