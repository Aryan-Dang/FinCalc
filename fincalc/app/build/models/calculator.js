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
const Logger = logging_1.newChildLogger("models:calculator");
const COLUMNS = [
    "name", "branding_img", "fields", "colors", "calc_type",
    "uuid", "shortid", "org_uuid", "created_at", "updated_at",
    "mailchimp_list"
];
function isCalculatorColumn(s) {
    if (s)
        return COLUMNS.indexOf(s) >= 0;
    else
        return false;
}
exports.isCalculatorColumn = isCalculatorColumn;
class CalcRepo {
    static getByUUID(uuid, fields = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const calcs = yield knex_1.default("calculators")
                    .where({ uuid })
                    .select(...fields);
                app_1.App.assert(!!calcs && calcs.length < 2, "More than one calculator was returned for a UUID.");
                return calcs[0] || null;
            }
            catch (err) {
                Logger.error(err, `Error while getting calculator by UUID(${uuid}).`);
                throw new util_1.ModelError(`Failed to get calculator by UUID(${uuid}).`);
            }
        });
    }
    static getByShortId(shortid, fields = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const calcs = yield knex_1.default("calculators")
                    .where({ shortid })
                    .select(...fields);
                app_1.App.assert(!!calcs && calcs.length < 2, "More than one calculator was returned for a Short Id.");
                return calcs[0] || null;
            }
            catch (err) {
                Logger.error(err, `Error while getting calculator by Short Id(${shortid}).`);
                throw new util_1.ModelError(`Failed to get calculator by Short Id(${shortid}).`);
            }
        });
    }
    static getAllByOrgUUID(orgUUID, fields = [], orderBy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = knex_1.default("calculators").where({ org_uuid: orgUUID });
                if (orderBy) {
                    query = orderBy.apply(query);
                }
                const calcs = yield query.select(...fields);
                app_1.App.assert(Array.isArray(calcs), "Expected an array of calculators to be returned.");
                return calcs;
            }
            catch (err) {
                Logger.error(err, `Error while getting calculators by org UUID(${orgUUID})`);
                throw new util_1.ModelError(`Failed to get calculators by Org UUID(${orgUUID})`);
            }
        });
    }
    static insert(calc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                calc = util_1.autoConvertJSON(calc, "fields", "colors");
                const calcId = yield knex_1.default("calculators")
                    .insert(calc)
                    .returning("uuid");
                return calcId[0];
            }
            catch (err) {
                Logger.error(err, "Error while inserting calculator.");
                throw new util_1.ModelError("Failed to insert new calculator.");
            }
        });
    }
    static updateByUUID(uuid, calc) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                calc = util_1.autoConvertJSON(calc, "fields", "colors");
                const calcId = yield knex_1.default("calculators")
                    .where({ uuid })
                    .returning("uuid")
                    .update(calc);
                return !!calcId[0];
            }
            catch (err) {
                Logger.error(err, "Error while updating calculator.");
                throw new util_1.ModelError("Failed to update calculator row.");
            }
        });
    }
    static deleteByUUID(uuid, returning = "uuid") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const calcId = yield knex_1.default("calculators")
                    .where({ uuid })
                    .delete(returning);
                return calcId[0];
            }
            catch (err) {
                Logger.error(err, "Error while deleting calculator(%s)", uuid);
                throw new util_1.ModelError(`Failed to delete calculator with UUID(${uuid}).`);
            }
        });
    }
}
CalcRepo.calculatorEditFilter = new util_1.PropertyFilter({
    name: "Edit Calculator",
    allowed: ["name", "branding_img", "fields", "colors", "mailchimp_list"]
});
exports.CalcRepo = CalcRepo;
