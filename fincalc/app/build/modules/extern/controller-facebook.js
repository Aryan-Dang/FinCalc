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
const facebook_config_1 = require("../util/facebook/facebook-config");
const iid_1 = require("../../models/iid");
const extern_1 = require("../../models/extern");
const node_fetch_1 = require("node-fetch");
const facebook_api_1 = require("../util/facebook/facebook-api");
const Crypto = require("crypto");
const logging_1 = require("../../logging");
const calculator_1 = require("../../models/calculator");
const org_1 = require("../../models/org");
const calc_1 = require("../api/api-models/calc");
const Logger = logging_1.newChildLogger("facebook");
function renderTabContent(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        if (request.body && typeof request.body.signed_request === "string") {
            const signedRequest = request.body.signed_request;
            const parsedSignedRequest = parseFacebookSignedRequest(signedRequest, facebook_config_1.FacebookConfig.appSecret);
            let pageId = null;
            if (parsedSignedRequest['page'] && typeof parsedSignedRequest['page'] === 'object') {
                if (parsedSignedRequest['page']['id'] && typeof parsedSignedRequest['page']['id'] === 'string') {
                    pageId = parsedSignedRequest['page']['id'];
                }
            }
            if (pageId) {
                const tabInfo = yield extern_1.ExternRepo.getTabInfoByPage(pageId);
                if (tabInfo) {
                    const org = (yield org_1.OrgRepo.getByUUID(tabInfo.org_uuid));
                    const calculators = yield calculator_1.CalcRepo.getAllByOrgUUID(tabInfo.org_uuid, ["shortid", "name", "calc_type", "branding_img"]);
                    let brandingImage = org.branding_img;
                    if (typeof brandingImage === "string") {
                        brandingImage = brandingImage.trim();
                        if (brandingImage.length < 1) {
                            brandingImage = "/static/img/home/logo-black.png";
                        }
                        if (!brandingImage.startsWith("/"))
                            brandingImage = "/" + brandingImage;
                    }
                    else {
                        brandingImage = "/static/img/home/logo-black.png";
                    }
                    calculators.forEach((calculator) => {
                        calculator["typeText"] = calculatorTypeToText(calculator.calc_type);
                    });
                    yield context.render("calc-list", {
                        calculators: calculators,
                        brandingImage: brandingImage
                    });
                    return;
                }
            }
        }
        // #TODO: better error page.
        context.body = "Calculator Not Found";
        context.status = 404;
        return;
    });
}
exports.renderTabContent = renderTabContent;
/**
 * The user is redirected to this controller after connecting their facebook account.
 */
function connectEnd(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const internalId = typeof context.params.uuid === "string" ? context.params.uuid : undefined;
        if (context.query.code && internalId) {
            try {
                const orgUUID = yield iid_1.InternalId.consumeInternalUUID(internalId, "facebook-connect-org-uuid");
                const exchangeUrl = context.createUrl("https://graph.facebook.com/v2.11/oauth/access_token", {
                    client_id: facebook_config_1.FacebookConfig.appId,
                    client_secret: facebook_config_1.FacebookConfig.appSecret,
                    redirect_uri: context.createUrl("/facebook/connect-redirect/" + internalId),
                    code: context.query.code
                });
                const response = yield node_fetch_1.default(exchangeUrl, { method: "GET" }).then(res => res.json());
                const accessToken = typeof response["access_token"] === "string" ? response["access_token"] : undefined;
                let expiresIn = typeof response["expires_in"] === "number" ? response["expires_in"] : undefined;
                const tokenType = typeof response["token_type"] === "string" ? response["token_type"] : "";
                if (!expiresIn) {
                    const weeks = 30 * 86400; // a month in seconds
                    expiresIn = weeks * 2; // 2 months
                }
                if (accessToken) {
                    const facebook = facebook_api_1.Facebook.newInstance(accessToken);
                    const user = yield facebook.graphGet("/me", { fields: "id" });
                    if (user && typeof user.id === "string") {
                        yield extern_1.ExternRepo.insertFacebookConnection(orgUUID, user.id, accessToken, tokenType, expiresIn);
                    }
                    else {
                        context.logger.error("/me returned a null user or user without id.");
                    }
                }
                else {
                    context.logger.warn("Received Facebook response with no access token or expires in.", response);
                }
            }
            catch (err) {
                context.logger.error(err, "Error occurred while getting Facebook access token.");
            }
        }
        context.redirect(context.createUrl("/dashboard#!/settings?tab=conn"));
    });
}
exports.connectEnd = connectEnd;
function parseFacebookSignedRequest(signedRequest, appSecret) {
    try {
        const [encoded_sig, payload] = signedRequest.split('.');
        const hmac = Crypto.createHmac('sha256', appSecret);
        hmac.update(payload);
        const sig = Buffer.from(decodeURIComponent(encoded_sig), 'base64').toString('base64');
        const expectedSig = hmac.digest('base64');
        if (sig === expectedSig) {
            const data = JSON.parse(Buffer.from(decodeURIComponent(payload), 'base64').toString('utf-8'));
            return data;
        }
        else {
            Logger.warn('Signature did not match expected signature!');
        }
    }
    catch (e) {
        Logger.warn("Failed to decode Facebook signed request: %s", signedRequest.substr(0, 256), e);
    }
    return null;
}
exports.parseFacebookSignedRequest = parseFacebookSignedRequest;
function calculatorTypeToText(type) {
    switch (type) {
        case calc_1.CalculatorType.Mortgage: return "Mortgage";
        case calc_1.CalculatorType.AutoLoan: return "Auto Loan";
        case calc_1.CalculatorType.HomeEquityLoan: return "Home Equity Loan";
        case calc_1.CalculatorType.CDLoan: return "CD Loan";
        case calc_1.CalculatorType.MoneyMarketLoan: return "Money Market Loan";
        case calc_1.CalculatorType.BoatRVLoan: return "Boat/RV Loan";
        case calc_1.CalculatorType.PersonalLoan: return "Personal Loan";
        default: return "Unknown";
    }
}
exports.calculatorTypeToText = calculatorTypeToText;
