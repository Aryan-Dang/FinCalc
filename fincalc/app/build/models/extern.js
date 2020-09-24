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
const Logger = logging_1.newChildLogger("models:extern");
class ExternRepo {
    static insertMailchimpConnection(orgUUID, accessToken, expiresIn, scope) {
        return __awaiter(this, void 0, void 0, function* () {
            const insert = {
                org_uuid: orgUUID,
                access_token: accessToken,
                scope: scope,
            };
            yield knex_1.default("mailchimp_conn").insert(insert);
        });
    }
    static deleteMailchimpConnection(orgUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default("mailchimp_conn").where({ org_uuid: orgUUID }).del();
            return true;
        });
    }
    static getMailchimpConnection(orgUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield knex_1.default("mailchimp_conn").where({ org_uuid: orgUUID }).select();
            if (conn && conn[0])
                return conn[0];
            return null;
        });
    }
    static insertFacebookConnection(orgUUID, userId, accessToken, tokenType, expiresIn) {
        return __awaiter(this, void 0, void 0, function* () {
            const insert = {
                org_uuid: orgUUID,
                userid: userId,
                access_token: accessToken,
                token_type: tokenType,
                expires_at: date_fns_1.addSeconds(new Date, expiresIn),
            };
            yield knex_1.default("facebook_conn").insert(insert);
        });
    }
    static getFacebookConnection(orgUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield knex_1.default("facebook_conn").where({ org_uuid: orgUUID }).select();
            if (conn && conn[0])
                return conn[0];
            return null;
        });
    }
    static deleteFacebookConnection(orgUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            yield knex_1.default("facebook_conn").where({ org_uuid: orgUUID }).del();
            return true;
        });
    }
    static getInstalledPageTabs(orgUUID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield knex_1.default("facebook_tabs")
                    .where({ org_uuid: orgUUID })
                    .select(["page_id"]);
            }
            catch (e) {
                Logger.error(e, "Failed to get installed page tabs.");
                throw new util_1.ModelError("Failed to get installed page tabs.");
            }
        });
    }
    static setPageTabInstalled(orgUUID, pageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield knex_1.default("facebook_tabs").insert({ org_uuid: orgUUID, page_id: pageId });
                return true;
            }
            catch (e) {
                Logger.error(e, "Failed to mark facebook tab as installed.");
            }
            return false;
        });
    }
    static unsetPageTabInstalled(orgUUID, pageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield knex_1.default("facebook_tabs")
                    .where({ org_uuid: orgUUID, page_id: pageId })
                    .del("org_uuid");
                return true;
            }
            catch (e) {
                Logger.error(e, "Failed to mark facebook tab as installed.");
            }
            return false;
        });
    }
    static getTabInfoByPage(pageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = yield knex_1.default("facebook_tabs")
                    .where({ page_id: pageId })
                    .select();
                if (results && results.length > 0)
                    return results[0];
            }
            catch (e) {
                Logger.error(e, "Failed to get facebook page info.");
            }
            return null;
        });
    }
}
exports.ExternRepo = ExternRepo;
