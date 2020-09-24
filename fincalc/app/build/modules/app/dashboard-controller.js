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
const serve = require("koa-static");
const Path = require("path");
const http_cache_1 = require("../../util/http-cache");
const dashboardStaticRoot = "build/protected/dashboard";
const dashboardStaticRootAbsolute = Path.resolve(dashboardStaticRoot);
const dashboardStaticOptions = {
    maxage: 0,
    gzip: false
};
const dashboardAssetsServe = serve(dashboardStaticRoot, dashboardStaticOptions);
const NULL_NEXT = () => null;
function dashboard(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let resource = context.params["resource"];
        if (resource)
            resource = resource.trim();
        if (!resource || resource.length < 1) {
            resource = "index.html";
        }
        const fullResourcePath = Path.join(dashboardStaticRootAbsolute, resource);
        if (!(yield http_cache_1.modifiedTimeIsFreshOrError(context, fullResourcePath))) {
            const oldPath = context.path;
            context.path = resource;
            yield dashboardAssetsServe(context, NULL_NEXT);
            context.path = oldPath;
            if (process.env.NODE_ENV === "production" || resource !== "app.bundle.js") {
                context.set("Cache-Control", "max-age 86400");
            }
        }
    });
}
exports.dashboard = dashboard;
