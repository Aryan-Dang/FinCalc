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
const date_fns_1 = require("date-fns");
const logging_1 = require("../logging");
const knex_1 = require("../util/knex");
const Logger = logging_1.newChildLogger("models:iid");
class InternalId {
    static createInternalUUID(realUUID, purpose, expiresAt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!expiresAt) {
                    expiresAt = date_fns_1.addHours(new Date, 1);
                }
                if (typeof expiresAt === "string") {
                    switch (expiresAt) {
                        case "30min":
                            expiresAt = date_fns_1.addMinutes(new Date, 30);
                            break;
                        case "hour":
                            expiresAt = date_fns_1.addHours(new Date, 1);
                            break;
                        case "day":
                            expiresAt = date_fns_1.addDays(new Date, 1);
                            break;
                        default: throw new Error("Unknown expires at value.");
                    }
                }
                const iids = yield knex_1.default("internal_ids")
                    .insert({ mapsto: realUUID, purpose, expires_at: expiresAt })
                    .returning("uuid");
                return iids[0];
            }
            catch (e) {
                Logger.error(e, "Failed to generate internal ID.");
                throw new util_1.ModelError("Failed to generate internal Id.");
            }
        });
    }
    static consumeInternalUUID(internalUUID, purpose) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = knex_1.default("internal_ids")
                    .where({ uuid: internalUUID })
                    .andWhereRaw("expires_at >= now()");
                if (purpose) {
                    query = query.andWhere("purpose", "=", purpose);
                }
                const iids = yield query.del("mapsto");
                return iids[0];
            }
            catch (e) {
                Logger.error(e, "Failed to consume internal UUID.");
                throw new util_1.ModelError("Failed to consume internal UUID.");
            }
        });
    }
}
exports.InternalId = InternalId;
