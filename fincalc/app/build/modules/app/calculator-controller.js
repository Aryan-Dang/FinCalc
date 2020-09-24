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
const FileSystem = require("mz/fs");
const Path = require("path");
const calculator_1 = require("../../models/calculator");
const app_1 = require("../../util/app");
const events_1 = require("../../models/events");
const metrics_1 = require("../../util/metrics");
const http_cache_1 = require("../../util/http-cache");
const org_1 = require("../../models/org");
const calculatorStaticRoot = "build/protected/calculator";
const calculatorStaticRootAbsolute = Path.resolve(calculatorStaticRoot);
const calculatorStaticOptions = {
    maxage: 0,
    gzip: false
};
const calculatorAssetsServe = serve(calculatorStaticRoot, calculatorStaticOptions);
const NULL_NEXT = () => null;
// #TODO: cache this at some point:
function getCalculatorSections() {
    return __awaiter(this, void 0, void 0, function* () {
        const calculatorIndexPath = Path.join(calculatorStaticRoot, "index.html");
        const calculatorIndexSource = (yield FileSystem.readFile(calculatorIndexPath)).toString("utf8");
        let endOfHeadSection = calculatorIndexSource.indexOf("</head>");
        if (endOfHeadSection < 0) {
            endOfHeadSection = calculatorIndexSource.indexOf("</ head>");
        }
        if (endOfHeadSection < 0) {
            throw new Error("Failed to find the closing head tag.");
        }
        return [
            calculatorIndexSource.substring(0, endOfHeadSection),
            calculatorIndexSource.substring(endOfHeadSection),
        ];
    });
}
function calculator(context) {
    return __awaiter(this, void 0, void 0, function* () {
        app_1.App.assertExists(!!context.currentSessionId, "No session Id.");
        app_1.App.assertExists(!!context.currentVisitorId, "No visitor Id.");
        const shortId = context.params["shortid"];
        const calculator = yield calculator_1.CalcRepo.getByShortId(shortId, ["uuid", "org_uuid", "shortid", "name", "branding_img", "fields", "colors", "calc_type"]);
        if (calculator) {
            const calcUUID = calculator.uuid;
            const orgUUID = calculator.org_uuid;
            const org = (yield org_1.OrgRepo.getByUUID(orgUUID, ["branding_img"]));
            // we don't want these properties to get to the client.
            delete calculator["uuid"];
            delete calculator["org_uuid"];
            const [beforeInject, afterInject] = yield getCalculatorSections();
            calculator["branding_img"] = org.branding_img || undefined; // #FIXME: This should not overwrite the calculator's branding image.
            const calculatorJSON = JSON.stringify(calculator);
            const calculatorJSONEncoded = (new Buffer(calculatorJSON, "utf8")).toString("base64");
            // #TODO: find some way to mangle this a bit.
            const inject = `window["fcalcinfoEncoded"] = "${calculatorJSONEncoded}"`;
            context.body = `${beforeInject}<script type="text/javascript">${inject}</script>${afterInject}`;
            context.status = 200;
            yield events_1.EventRepo.insert({
                event_type: "visit",
                visitor_uuid: context.currentVisitorId,
                session_uuid: context.currentSessionId,
                calc_uuid: calcUUID,
                org_uuid: orgUUID,
                metadata: {
                    ip_addr: metrics_1.getIPAddress(context),
                    user_agent: context.get("User-Agent"),
                }
            });
        }
        else {
            // #TODO: redirect to the 404 page here.
            context.body = "404!";
            context.status = 404;
        }
    });
}
exports.calculator = calculator;
function calculatorStatic(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let resource = context.params["resource"];
        if (resource)
            resource = resource.trim();
        if (!resource || resource.length < 1) {
            resource = "index.html";
        }
        const fullResourcePath = Path.join(calculatorStaticRootAbsolute, resource);
        if (!(yield http_cache_1.modifiedTimeIsFreshOrError(context, fullResourcePath))) {
            const oldPath = context.path;
            context.path = resource;
            yield calculatorAssetsServe(context, NULL_NEXT);
            context.path = oldPath;
            if (process.env.NODE_ENV === "production" || resource !== "app.bundle.js") {
                context.set("Cache-Control", "immutable, max-age 86400");
            }
        }
    });
}
exports.calculatorStatic = calculatorStatic;
