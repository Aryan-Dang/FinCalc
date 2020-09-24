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
const auth_1 = require("../../util/auth");
const app_1 = require("../../util/app");
const logging_1 = require("../../logging");
const date_fns_1 = require("date-fns");
exports.USER_TOKEN_VERSION = 1;
const Logger = logging_1.newChildLogger("api");
;
;
class API {
    static validationsToStrings(validationErrors) {
        const errors = [];
        for (const verror of validationErrors) {
            for (const constraintName in verror.constraints) {
                const constraint = verror.constraints[constraintName];
                errors.push({
                    property: verror.property,
                    message: constraint.replace(/\$property/g, verror.property)
                });
            }
        }
        return errors;
    }
    static validationToString(validationError) {
        const errors = [];
        for (const constraintName in validationError.constraints) {
            const constraint = validationError.constraints[constraintName];
            errors.push({
                property: validationError.property,
                message: constraint.replace(/\$property/g, validationError.property)
            });
        }
        return errors;
    }
    static verror(context, err, code = API.codes.BadRequest) {
        context.status = code;
        context.body = {
            errors: API.validationToString(err)
        };
    }
    static verrors(context, errs, code = API.codes.BadRequest) {
        context.status = code;
        context.body = {
            errors: API.validationsToStrings(errs)
        };
    }
    static error(context, err, code = API.codes.BadRequest) {
        context.status = code;
        context.body = {
            errors: [err]
        };
    }
    static errors(context, errs, code = API.codes.BadRequest) {
        context.status = code;
        context.body = {
            errors: errs
        };
    }
    static success(context, data, code = API.codes.Success) {
        context.status = code;
        context.body = { data };
    }
}
API.codes = {
    Success: 200,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    RequestURITooLong: 414,
    UnsupportedMediaType: 415,
    RequestedRangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    ConnectionClosedWithoutResponse: 444,
    UnavailableForLegalReasons: 451,
    ClientClosedRequest: 499,
};
exports.default = API;
function isUserToken(o) {
    return o &&
        (typeof o["userUUID"] === "string") &&
        (typeof o["refresh"] === "string") &&
        (typeof o["orgUUID"] === "string") &&
        (typeof o["version"] === "number");
}
exports.isUserToken = isUserToken;
function ensureAuthorization(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorization = context.get("Authorization");
        const [type, signedToken] = authorization.split(" ");
        try {
            if (type && signedToken && type.toLocaleLowerCase() === "bearer" && signedToken.length > 0) {
                const decoded = yield auth_1.validateToken(signedToken, isUserToken);
                if (Date.now() + decoded.expiresIn > (Date.now() / 1000) && decoded.version === exports.USER_TOKEN_VERSION) {
                    context.currentAuth = decoded;
                    yield next();
                    return;
                }
            }
        }
        catch (err) {
            if (err["name"]) {
                const _name = err["name"];
                if (_name === "TokenExpiredError" || _name === "JsonWebTokenError") {
                    // #FIXME: This is actually a bad token, maybe I should return a different error?
                    return API.error(context, "User not authorized.", API.codes.Unauthorized);
                }
            }
            Logger.error(err, "Error at authorized API endpoint: " + context.request.path);
            throw new app_1.AppError(err.message || "Error while processing authorized API request.");
        }
        return API.error(context, "User not authorized.", API.codes.Unauthorized);
    });
}
exports.ensureAuthorization = ensureAuthorization;
function ensureAuthorizationCookies(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const signedToken = context.cookies.get("authtoken", { signed: true });
        try {
            if (signedToken && signedToken.length > 0) {
                const decoded = yield auth_1.validateToken(signedToken, isUserToken);
                if (Date.now() + decoded.expiresIn > (Date.now() / 1000) && decoded.version === exports.USER_TOKEN_VERSION) {
                    context.currentAuth = decoded;
                    context.currentAuthSignedToken = signedToken;
                    yield next();
                    return;
                }
            }
        }
        catch (err) {
            if (err["name"]) {
                const _name = err["name"];
                if (_name === "TokenExpiredError" || _name === "JsonWebTokenError") {
                    // #FIXME: This is actually a bad token, maybe I should return a different error?
                    return API.error(context, "User not authorized.", API.codes.Unauthorized);
                }
            }
            Logger.error(err, "Error at authorized API endpoint: " + context.request.path);
            throw new app_1.AppError(err.message || "Error while processing authorized API request.");
        }
        // #FIXME: This should 404 instead.
        return API.error(context, "User not authorized.", API.codes.Unauthorized);
    });
}
exports.ensureAuthorizationCookies = ensureAuthorizationCookies;
function setCookieAuth(context, signedToken) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = signedToken || context.currentAuthSignedToken;
        if (token) {
            context.cookies.set("authtoken", token, {
                expires: date_fns_1.addDays(new Date, 3),
                signed: true,
                httpOnly: true
            });
        }
    });
}
exports.setCookieAuth = setCookieAuth;
