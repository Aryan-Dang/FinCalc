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
const util_1 = require("./util");
const logging_1 = require("../logging");
const app_1 = require("../util/app");
const knex_1 = require("../util/knex");
const Logger = logging_1.newChildLogger("models:event");
class EventRepo {
    static visitorEventExists(visitorUUID, eventType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield knex_1.default("events")
                    .where({ visitor_uuid: visitorUUID, event_type: eventType })
                    .select("id");
                return events && events.length > 0;
            }
            catch (err) {
                Logger.error(err, "Error while checking if visitor event exists.");
                throw new util_1.ModelError("An error occurred while checking if a visitor event exists.");
            }
        });
    }
    static insert(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exists = yield EventRepo.visitorEventExists(event.visitor_uuid, event.event_type);
                let metadata;
                switch (typeof event.metadata) {
                    case "undefined":
                        metadata = {};
                        break;
                    case "object": metadata = event.metadata || {};
                    default: metadata = JSON.stringify(event.metadata);
                }
                const _insert = {
                    event_type: event.event_type,
                    visitor_uuid: event.visitor_uuid,
                    session_uuid: event.session_uuid,
                    org_uuid: event.org_uuid,
                    calc_uuid: event.calc_uuid,
                    metadata,
                    is_unique: !exists,
                };
                const eventId = yield knex_1.default("events")
                    .insert(_insert)
                    .returning("id");
                return eventId[0];
            }
            catch (err) {
                Logger.error(err, "Error while inserting event.");
                throw new util_1.ModelError("Failed to insert new event.");
            }
        });
    }
    static getEventCountInRange(eventTypes, fromDate, toDate, orgUUID, calculatorUUID = undefined, fields = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = knex_1.default("events")
                    .whereIn("event_type", eventTypes)
                    .where("created_at", ">=", knex_1.default.raw("?::timestamptz", fromDate.toISOString()))
                    .andWhere("created_at", "<=", knex_1.default.raw("?::timestamptz", toDate.toISOString()))
                    .andWhere("org_uuid", "=", orgUUID);
                if (calculatorUUID)
                    query = query.andWhere("calc_uuid", "=", calculatorUUID);
                // #FIXME: The fix for this really is to just get the user's timezone
                //         to the server somehow and then add their offset (int hours) from GMT to the UTC time.
                // Adding the time here seems stupid but it's just here as a temporary patch
                // until I find someway to deliver the correct timezone to postgresql while it does
                // the conversion from timestamp -> date, because when I get back the date,
                // it's in UTC, and then to convert it to eastern time 4 hours is removed from it
                // and then I truncate it to a date on the client so then all of the events appear a day too early :(
                // so instead I just return a full timestamp in the middle of the day.
                // -- Adolph C. @December 03, 2017
                query = query.groupByRaw("(created_at::date + time '4:00'), event_type");
                query = query.select(knex_1.default.raw("count(*) as event_count"), knex_1.default.raw("created_at::date + time '4:00' AS created_at"), "event_type");
                const events = yield query;
                app_1.App.assert(Array.isArray(events), "DB query did not return an array of events.");
                return events;
            }
            catch (err) {
                Logger.error(err, "Error while gettings events.");
                throw new util_1.ModelError("Failed to get events from DB.");
            }
        });
    }
}
exports.EventRepo = EventRepo;
