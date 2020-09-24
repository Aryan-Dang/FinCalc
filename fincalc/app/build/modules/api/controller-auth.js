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
const class_validator_1 = require("class-validator");
const user_1 = require("../../models/user");
const auth_1 = require("../../models/auth");
const auth_2 = require("../../util/auth");
const app_1 = require("../../util/app");
const api_models_1 = require("./api-models");
const api_1 = require("./api");
function login(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        const loginCredentials = new api_models_1.LoginCredentials(request.body);
        // validation:
        const validationErrors = class_validator_1.validateSync(loginCredentials);
        if (validationErrors && validationErrors.length) {
            return api_1.default.verrors(context, validationErrors);
        }
        // login:
        const user = yield user_1.UserRepo.getByEmail(loginCredentials.email, ["password", "uuid", "org_uuid"]);
        if (user) {
            if (yield auth_2.comparePassword(loginCredentials.password, user.password)) {
                app_1.App.assert(!!user, "Null user returned after authentication.");
                const _now = Date.now() / 1000;
                const expiresIn = _now + auth_2.JWT_LIFETIME_SEC;
                const refreshExpiresIn = _now + auth_2.JWT_REFRESH_LIFETIME_SEC;
                // #FIXME: Refresh should be encoding the token and stored in a DB.
                const refresh = yield auth_2.createRefreshToken(user.uuid, "");
                const tokenObject = {
                    refresh,
                    userUUID: user.uuid,
                    orgUUID: user.org_uuid,
                    expiresIn,
                    refreshExpiresIn,
                    version: api_1.USER_TOKEN_VERSION
                };
                const token = yield auth_2.signToken(tokenObject);
                yield user_1.UserRepo.updateByUUID(user.uuid, { last_login_at: new Date() });
                api_1.setCookieAuth(context, token);
                return api_1.default.success(context, new api_models_1.LoginResponse(token, auth_2.JWT_LIFETIME_SEC, refresh, auth_2.JWT_REFRESH_LIFETIME_SEC));
            }
        }
        return api_1.default.error(context, "No user with that email and password.");
    });
}
exports.login = login;
function signup(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        const signupInfo = new api_models_1.SignupInfo(request.body);
        // validation:
        const validationErrors = class_validator_1.validateSync(signupInfo);
        if (validationErrors && validationErrors.length) {
            return api_1.default.verrors(context, validationErrors, api_1.default.codes.BadRequest);
        }
        // email exists check:
        const userFound = !!(yield user_1.UserRepo.getByEmail(signupInfo.email, ["uuid"]));
        if (userFound) {
            return api_1.default.error(context, {
                property: "email",
                message: "A user with this email already exists."
            }, api_1.default.codes.Conflict);
        }
        const hashedPassword = yield auth_2.hashPassword(signupInfo.password);
        // creation:
        const { userUUID: user_uuid, orgUUID: org_uuid } = yield auth_1.AuthRepo.createUserWithOrg({
            email: signupInfo.email,
            first_name: signupInfo.first_name,
            last_name: signupInfo.last_name,
            password: hashedPassword
        }, {
            name: signupInfo.org_name
        });
        return api_1.default.success(context, new api_models_1.SignupResponse({ user_uuid, org_uuid }));
    });
}
exports.signup = signup;
function refresh(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        const refreshInfo = new api_models_1.RefreshInfo(request.body);
        // validation:
        const validationErrors = class_validator_1.validateSync(refreshInfo);
        if (validationErrors && validationErrors.length) {
            return api_1.default.verrors(context, validationErrors, api_1.default.codes.BadRequest);
        }
        const authorization = context.get("Authorization");
        const [type, signedToken] = authorization.split(" ");
        if (type && signedToken && type.toLocaleLowerCase() === "bearer" && signedToken.length > 0) {
            const decoded = yield auth_2.validateToken(signedToken, api_1.isUserToken);
            const _now = Date.now() / 1000;
            if ((decoded.refreshExpiresIn + _now) > _now && decoded.refresh === refreshInfo.refresh && decoded.version === api_1.USER_TOKEN_VERSION) {
                const expiresIn = _now + auth_2.JWT_LIFETIME_SEC;
                const refreshExpiresIn = _now + auth_2.JWT_REFRESH_LIFETIME_SEC;
                // #FIXME: Refresh should be encoding the token and stored in a DB.
                const refresh = yield auth_2.createRefreshToken(decoded.userUUID, "");
                const tokenObject = {
                    refresh,
                    userUUID: decoded.userUUID,
                    orgUUID: decoded.orgUUID,
                    expiresIn,
                    refreshExpiresIn,
                    version: api_1.USER_TOKEN_VERSION
                };
                const token = yield auth_2.signToken(tokenObject);
                return api_1.default.success(context, new api_models_1.LoginResponse(token, auth_2.JWT_LIFETIME_SEC, refresh, auth_2.JWT_REFRESH_LIFETIME_SEC));
            }
        }
        return api_1.default.error(context, "Invalid authorization.", api_1.default.codes.Unauthorized);
    });
}
exports.refresh = refresh;
