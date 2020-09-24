"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
exports.MailchimpConfig = {
    clientId: config.get("mailchimp.clientId"),
    clientSecret: config.get("mailchimp.clientSecret"),
    authorizeURI: "https://login.mailchimp.com/oauth2/authorize",
    accessTokenURI: "https://login.mailchimp.com/oauth2/token",
    metadataURI: "https://login.mailchimp.com/oauth2/metadata",
};
