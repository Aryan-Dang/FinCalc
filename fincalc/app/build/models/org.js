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
const knex_1 = require("../util/knex");
const Logger = logging_1.newChildLogger("models:user");
class OrgRepo {
    static getByUUID(uuid, fields = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield knex_1.default("orgs")
                    .where({ uuid })
                    .select(...fields);
                return users[0] || null;
            }
            catch (e) {
                Logger.error(`Error while getting org by UUID(${uuid}).`);
                throw new util_1.ModelError(`Failed to get org by UUID(${uuid}).`);
            }
        });
    }
    static insert(org) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orgId = yield knex_1.default("orgs")
                    .insert(org)
                    .returning("uuid");
                return orgId[0];
            }
            catch (e) {
                Logger.error("Error while inserting org.", e.message || e);
                throw new util_1.ModelError("Failed to insert new org.");
            }
        });
    }
    static updateByUUID(uuid, org) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orgId = yield knex_1.default("orgs")
                    .where({ uuid })
                    .returning("uuid")
                    .update(org);
                return !!orgId[0];
            }
            catch (err) {
                Logger.error(err, "Error while updating org.");
                throw new util_1.ModelError("Failed to update org row.");
            }
        });
    }
}
exports.OrgRepo = OrgRepo;
