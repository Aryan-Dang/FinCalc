"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
exports.FacebookConfig = {
    appId: config.get("facebook.appId"),
    appSecret: config.get("facebook.appSecret"),
};
