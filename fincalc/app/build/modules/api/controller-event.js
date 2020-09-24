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
const app_1 = require("../../util/app");
const event_1 = require("./api-models/event");
const class_validator_1 = require("class-validator");
const events_1 = require("../../models/events");
const date_fns_1 = require("date-fns");
const api_1 = require("./api");
const ALLOWED_EVENT_COLUMNS = [
    "id", "event_type",
    "created_at", "is_unique",
    "org_uuid", "calc_uuid",
];
const ALLOWED_EVENT_TYPES = ["visit", "engagement", "conversion"];
function getEventsDaily(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached events/daily endpoint without authorization.");
        const eventGetInput = new event_1.EventGetDailyInput(request.query);
        // validation:
        const validationErrors = class_validator_1.validateSync(eventGetInput, { skipMissingProperties: true });
        if (validationErrors && validationErrors.length) {
            return api_1.default.verrors(context, validationErrors);
        }
        let startDate = new Date(eventGetInput.startdate);
        let endDate = new Date(eventGetInput.enddate);
        if (date_fns_1.compareAsc(startDate, endDate) >= 1) {
            let temp = startDate;
            startDate = endDate;
            endDate = temp;
        }
        const dayDiff = date_fns_1.differenceInDays(endDate, startDate);
        if (dayDiff > 90) {
            return api_1.default.error(context, "Difference between dates cannot be greater than 90 days.");
        }
        const calculatorUUID = eventGetInput.calculator;
        const fields = eventGetInput.fields ? eventGetInput.fields.split(",").filter(s => ALLOWED_EVENT_COLUMNS.indexOf(s) >= 0) : [];
        const eventTypes = eventGetInput.eventtypes ? eventGetInput.eventtypes.split(",").filter(s => ALLOWED_EVENT_TYPES.indexOf(s) >= 0) : [];
        let events = yield events_1.EventRepo.getEventCountInRange(eventTypes, startDate, endDate, userAuth.orgUUID, calculatorUUID, fields);
        const response = { events };
        // get events:
        return api_1.default.success(context, response);
    });
}
exports.getEventsDaily = getEventsDaily;
