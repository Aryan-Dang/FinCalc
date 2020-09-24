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
const Logger = logging_1.newChildLogger("models:lead");
const COLUMNS = [
    "id", "name", "email", "phone_number", "calc_name",
    "calc_type", "calc_uuid", "created_at", "org_uuid",
    "term", "amount"
];
function isLeadColumn(s) {
    if (s)
        return COLUMNS.indexOf(s) >= 0;
    else
        return false;
}
exports.isLeadColumn = isLeadColumn;
class LeadRepo {
    static getById(id, fields = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leads = yield knex_1.default("leads")
                    .where({ id })
                    .select(...fields);
                app_1.App.assert(!!leads && leads.length < 2, "More than one lead was returned for a UUID.");
                return leads[0] || null;
            }
            catch (err) {
                Logger.error(err, `Error while getting lead by ID(${id}).`);
                throw new util_1.ModelError(`Failed to get lead by ID(${id}).`);
            }
        });
    }
    static insert(lead) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leadId = yield knex_1.default("leads")
                    .insert(lead)
                    .returning("id");
                return leadId[0];
            }
            catch (err) {
                Logger.error(err, "Error while inserting lead.");
                throw new util_1.ModelError("Failed to insert new lead.");
            }
        });
    }
    static getAllByOrgUUID(orgUUID, offset, count, fields = [], orderBy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = knex_1.default("leads").where({ org_uuid: orgUUID });
                if (orderBy) {
                    query = orderBy.apply(query);
                }
                query = query.offset(offset).limit(count);
                const leads = yield query.select(...fields);
                app_1.App.assert(Array.isArray(leads), "Expected an array of leads to be returned.");
                return leads;
            }
            catch (err) {
                Logger.error(err, `Error while getting leads by org UUID(${orgUUID})`);
                throw new util_1.ModelError(`Failed to get leads by org UUID(${orgUUID})`);
            }
        });
    }
    static getAllByOrgUUIDInRange(orgUUID, from, to, offset, count, fields = [], orderBy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = knex_1.default("leads")
                    .where("created_at", ">=", knex_1.default.raw("?::timestamptz", from.toISOString()))
                    .where("created_at", "<=", knex_1.default.raw("?::timestamptz", to.toISOString()));
                if (orderBy) {
                    query = orderBy.apply(query);
                }
                query = query.offset(offset).limit(count);
                query = query.select(...fields);
                const leads = yield query;
                app_1.App.assert(Array.isArray(leads), "Expected an array of leads to be returned.");
                return leads;
            }
            catch (err) {
                Logger.error(err, `Error while getting leads in range by org UUID.`);
                throw new util_1.ModelError("Failed to get leads in range by org UUID.");
            }
        });
    }
    static countAllByOrgUUIDInRange(orgUUID, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = knex_1.default("leads")
                    .where("created_at", ">=", knex_1.default.raw("?::timestamptz", from.toISOString()))
                    .where("created_at", "<=", knex_1.default.raw("?::timestamptz", to.toISOString()));
                const leadsCounts = yield query.count();
                return parseInt(leadsCounts[0].count) || 0;
            }
            catch (err) {
                Logger.error(err, `Error while getting leads in range by org UUID.`);
                throw new util_1.ModelError("Failed to get leads in range by org UUID.");
            }
        });
    }
    static getAllByOrgUUIDInRangeQuick(orgUUID, from, to, count, after, fields = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leads = yield knex_1.default("leads")
                    .where("id", ">", after)
                    .where("created_at", ">=", knex_1.default.raw("?::timestamptz", from.toISOString()))
                    .where("created_at", "<=", knex_1.default.raw("?::timestamptz", to.toISOString()))
                    .select(...fields);
                app_1.App.assert(Array.isArray(leads), "Expected an array of leads to be returned.");
                return leads;
            }
            catch (err) {
                Logger.error(err, `Error while getting leads in range by org UUID.`);
                throw new util_1.ModelError("Failed to get leads in range by org UUID.");
            }
        });
    }
    // This shouldn't be used because at some point it will cause some security problem.
    // public static async getAllByCalcUUID(calcUUID: UUID, fields: LeadColumn[] = [], orderBy?: DBOrdering<LeadColumn>): Promise<ILead[]> {
    //     try {
    //         let query = knex("leads").where({ calc_uuid: calcUUID });
    //         if (orderBy) { query = orderBy.apply(query); }
    //         const leads = await query.select(...fields);
    //         App.assert(Array.isArray(leads), "Expected an array of leads to be returned.");
    //         return leads;
    //     } catch(err) {
    //         Logger.error(err, `Error while getting leads by calculator UUID(${calcUUID})`);
    //         throw new ModelError(`Failed to get calculators by calculator UUID(${calcUUID})`);
    //     }
    // }
    static getAllByOrgCalcUUID(orgUUID, calcUUID, offset, count, fields = [], orderBy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = knex_1.default("leads").where({ org_uuid: orgUUID, calc_uuid: calcUUID });
                if (orderBy) {
                    query = orderBy.apply(query);
                }
                query = query.offset(offset).limit(count);
                const leads = yield query.select(...fields);
                app_1.App.assert(Array.isArray(leads), "Expected an array of leads to be returned.");
                return leads;
            }
            catch (err) {
                Logger.error(err, `Error while getting leads by calculator UUID(${calcUUID})`);
                throw new util_1.ModelError(`Failed to get calculators by calculator UUID(${calcUUID})`);
            }
        });
    }
    static countAllByOrgUUID(orgUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leadsCounts = yield knex_1.default("leads")
                    .where({ org_uuid: orgUUID })
                    .count("id");
                return parseInt(leadsCounts[0].count) || 0;
            }
            catch (err) {
                Logger.error(err, `Error while counting leads by org UUID`);
                throw new util_1.ModelError(`Failed to count calculators by org UUID`);
            }
        });
    }
    static countAllByOrgCalcUUID(orgUUID, calcUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leadsCounts = yield knex_1.default("leads")
                    .where({ org_uuid: orgUUID, calc_uuid: calcUUID })
                    .count("id");
                return parseInt(leadsCounts[0].count) || 0;
            }
            catch (err) {
                Logger.error(err, `Error while counting leads by calculator and org UUID`);
                throw new util_1.ModelError(`Failed to count calculators by calculator and org UUID`);
            }
        });
    }
}
exports.LeadRepo = LeadRepo;
