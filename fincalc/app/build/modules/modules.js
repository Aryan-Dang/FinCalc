"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("koa-bodyparser");
const KoaBodyFiles = require("koa-body");
exports.defaultBodyParser = bodyParser({});
exports.multipartBodyParser = KoaBodyFiles({
    multipart: true,
    urlencoded: true,
});
