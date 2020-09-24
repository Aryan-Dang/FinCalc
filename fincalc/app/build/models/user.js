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
const Logger = logging_1.newChildLogger("models:user");
class UserRepo {
    static getByUUID(uuid, fields = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield knex_1.default("users")
                    .where({ uuid })
                    .select(...fields);
                app_1.App.assert(!!users && users.length < 2, "More than one user was returned for a UUID.");
                return users[0] || null;
            }
            catch (err) {
                Logger.error(err, `Error while getting user by UUID(${uuid}).`);
                throw new util_1.ModelError(`Failed to get user by UUID(${uuid}).`);
            }
        });
    }
    static getByEmail(email, fields = []) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield knex_1.default("users")
                    .whereRaw("email = lower(?)", email)
                    .select(...fields);
                app_1.App.assert(!!users && users.length < 2, "More than one user was returned for an email.");
                return users[0] || null;
            }
            catch (err) {
                Logger.error(err, `Error while getting user by email(${email}).`);
                throw new util_1.ModelError(`Failed to get user by email(${email}).`);
            }
        });
    }
    static insert(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = yield knex_1.default("users")
                    .insert(user)
                    .returning("uuid");
                return userId[0];
            }
            catch (err) {
                Logger.error(err, "Error while inserting user.");
                throw new util_1.ModelError("Failed to insert new user.");
            }
        });
    }
    static updateByUUID(uuid, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = yield knex_1.default("users")
                    .where({ uuid })
                    .returning("uuid")
                    .update(user);
                return !!userId[0];
            }
            catch (err) {
                Logger.error(err, "Error while updating user.");
                throw new util_1.ModelError("Failed to update user row.");
            }
        });
    }
}
exports.UserRepo = UserRepo;
