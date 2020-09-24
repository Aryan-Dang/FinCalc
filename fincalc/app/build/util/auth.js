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
const config = require("config");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const app_1 = require("../util/app");
const secretKey = `
lznei3730r4uemal4jg2p3202314utjtpqeb1p3ut113wj2i9fspwo9024o284tz
kjwrjyth2t3y991389ty20rqt2ngarhigvnbkiekbygq950jghi39850rjihybgo
ou43thkzi104839wrupi2r9gwbnwgripjt13h9t249giuhg34iog4iy1ijgajort
lna24ht132hr13tg4uohgaoaheot2k1r390r138ut24uihagwrouah8g4ngrwh9g
kaoefo190r289t40ugwagkpiawrt0y5380t24aovno4thrwwrh0oBohgrwoBWRuh
`.trim();
const SALT_ROUNDS = config.get("auth.saltRounds");
exports.JWT_LIFETIME_SEC = config.get("auth.jwtLifetimeSeconds");
exports.JWT_REFRESH_LIFETIME_SEC = config.get("auth.jwtRefreshLifetimeSeconds");
const JWT_ALGORITHM = config.get("auth.jwtAlgorithm");
const JWT_ALLOWED_ALGORITHMS = [JWT_ALGORITHM];
// #FIXME: for now this doesn't really need to userId but eventually
//         is should be using some sort of DB mechanism. And it shouldn't
//         be encoded into the signed token either. Rather the token should
//         be encoded into it.
function createRefreshToken(userId, token) {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(128, (err, buf) => {
            if (err)
                reject(err);
            else
                resolve(buf.toString("base64"));
        });
    });
}
exports.createRefreshToken = createRefreshToken;
function signToken(tokenObject) {
    const signed = JWT.sign(tokenObject, secretKey, {
        algorithm: JWT_ALGORITHM,
    });
    return signed;
}
exports.signToken = signToken;
function validateToken(signedTokenString, validator) {
    const obj = JWT.verify(signedTokenString, secretKey, {
        algorithms: JWT_ALLOWED_ALGORITHMS,
    });
    if (validator && !validator(obj)) {
        new app_1.AppError("JWT did not satisfy validator.");
    }
    return obj;
}
exports.validateToken = validateToken;
function hashPassword(plainTextPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasher = crypto.createHash("sha256");
        hasher.update(plainTextPassword);
        const hashedPassword = hasher.digest("hex");
        const hashed = yield bcrypt.hash(hashedPassword, SALT_ROUNDS);
        return hashed;
    });
}
exports.hashPassword = hashPassword;
function comparePassword(plainTextPassword, hasedDBPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const hasher = crypto.createHash("sha256");
        hasher.update(plainTextPassword);
        const hashedPassword = hasher.digest("hex");
        return yield bcrypt.compare(hashedPassword, hasedDBPassword);
    });
}
exports.comparePassword = comparePassword;
