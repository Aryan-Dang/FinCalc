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
const knex_1 = require("../util/knex");
class AuthRepo {
    /**
     * Creates an orginazation with a single user
     * in one transaction.
     */
    static createUserWithOrg(user, org) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield knex_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                const [orgUUID] = yield trx.insert(org, "uuid").into("orgs").transacting(trx);
                user["org_uuid"] = orgUUID;
                const [userUUID] = yield trx.insert(user, "uuid").into("users").transacting(trx);
                return { orgUUID, userUUID };
            }));
        });
    }
}
exports.AuthRepo = AuthRepo;
