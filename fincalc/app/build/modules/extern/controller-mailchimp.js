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
const mailchimp_config_1 = require("../util/mailchimp/mailchimp-config");
const iid_1 = require("../../models/iid");
const extern_1 = require("../../models/extern");
const node_fetch_1 = require("node-fetch");
function connectEnd(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const internalId = typeof context.params.uuid === "string" ? context.params.uuid : undefined;
        if (context.query.code && internalId) {
            try {
                const orgUUID = yield iid_1.InternalId.consumeInternalUUID(internalId, "mailchimp-connect-org-uuid");
                const exchangeURL = context.createUrl(mailchimp_config_1.MailchimpConfig.accessTokenURI);
                const exchangeBody = context.createQueryString({
                    grant_type: "authorization_code",
                    client_id: mailchimp_config_1.MailchimpConfig.clientId,
                    client_secret: mailchimp_config_1.MailchimpConfig.clientSecret,
                    redirect_uri: context.createUrl("/mailchimp/connect-redirect/" + internalId),
                    code: context.query.code
                });
                const response = yield node_fetch_1.default(exchangeURL, {
                    method: "POST",
                    body: exchangeBody,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                    }
                }).then(res => res.json());
                if (typeof response.access_token === "string") {
                    const accessToken = response.access_token;
                    const expiresIn = response.expires_in || 0;
                    const scope = response.scope || null;
                    yield extern_1.ExternRepo.insertMailchimpConnection(orgUUID, accessToken, expiresIn, scope);
                }
                else {
                    context.logger.warn("Received Mailchimp response with no access token or expires in.", response);
                }
            }
            catch (err) {
                context.logger.error(err, "Error occurred while getting Mailchimp access token.");
            }
        }
        context.redirect(context.createUrl("/dashboard#!/settings?tab=conn"));
    });
}
exports.connectEnd = connectEnd;
