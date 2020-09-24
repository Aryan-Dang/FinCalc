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
const calculator_1 = require("../../models/calculator");
const api_1 = require("./api");
const app_1 = require("../../util/app");
const shortid = require("shortid");
const calculations_1 = require("./calculations");
const events_1 = require("../../models/events");
const metrics_1 = require("../../util/metrics");
function jsonTryParse(str) {
    try {
        const obj = JSON.parse(str);
        return obj;
    }
    catch (e) {
        return undefined;
    }
}
exports.jsonTryParse = jsonTryParse;
function calculate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        let parameters = request.body && typeof request.body === "object" && request.body["parameters"];
        if (typeof parameters === "string") {
            parameters = jsonTryParse(parameters);
            if (!parameters) {
                return api_1.default.error(context, "Calculator parameters must be valid JSON.");
            }
        }
        else if (typeof parameters !== "object") {
            return api_1.default.error(context, "Bad calculator parameters.");
        }
        let calculatorType = null;
        const previewMode = !!request.body["preview"];
        let calculator;
        if (previewMode) {
            // #TODO: Maybe I should validate the calculator type here?
            calculatorType = request.body["calctype"] || null;
        }
        else {
            let calculatorShortId = request.body["shortid"];
            if (!shortid || typeof calculatorShortId !== "string")
                return api_1.default.error(context, "Missing or bad calculator shortId.");
            calculator = yield calculator_1.CalcRepo.getByShortId(calculatorShortId, ["calc_type", "org_uuid", "uuid", "name"]);
            if (!calculator)
                return api_1.default.error(context, "No calculator with that Id.");
            calculatorType = calculator.calc_type || null;
        }
        app_1.App.assert(!!calculatorType, "Calc type cannot be null here.");
        const calculateFunction = calculations_1.calculatorFunctions[calculatorType];
        if (calculateFunction) {
            const result = calculateFunction(parameters);
            if (result[0]) {
                if (calculator) {
                    const calcUUID = calculator.uuid;
                    const orgUUID = calculator.org_uuid;
                    yield events_1.EventRepo.insert({
                        event_type: "engagement",
                        visitor_uuid: context.currentVisitorId,
                        session_uuid: context.currentSessionId,
                        calc_uuid: calcUUID,
                        org_uuid: orgUUID,
                        metadata: {
                            ip_addr: metrics_1.getIPAddress(context),
                            user_agent: context.get("User-Agent"),
                            parameters: parameters,
                            calculatedPayments: result,
                        }
                    });
                }
                return api_1.default.success(context, result[2]);
            }
            else {
                return api_1.default.errors(context, result[1]);
            }
        }
        else {
            return api_1.default.error(context, "Calculator function not found for calculator.");
        }
    });
}
exports.calculate = calculate;
