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
const mailchimp_config_1 = require("./mailchimp-config");
const util_1 = require("../../../util");
const logging_1 = require("../../../logging");
const node_fetch_1 = require("node-fetch");
const Logger = logging_1.newChildLogger("mailchimp");
const API_VERSION = "3.0";
class Mailchimp {
    constructor(accessToken, clientId, clientSecret) {
        this.baseUrl = "https://login.mailchimp.com"; // initial state, fetch data center first :P
        this.authHeader = "";
        this.accessToken = accessToken;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.authHeader = "OAuth " + this.accessToken;
    }
    static newInstance(accessToken, clientId, clientSecret) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailchimp = new Mailchimp(accessToken, clientId || mailchimp_config_1.MailchimpConfig.clientId, clientSecret || mailchimp_config_1.MailchimpConfig.clientSecret);
            yield mailchimp.fetchDC();
            return mailchimp;
        });
    }
    fetchDC() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.request("GET", "/oauth2/metadata");
            let endpoint = response.api_endpoint;
            if (typeof endpoint !== "string" || endpoint.length < 1) {
                Logger.error("Bad mailchimp metadata: ", response);
                throw new Error("Bad mailchimp metadata.");
            }
            if (!endpoint.endsWith("/")) {
                endpoint += "/";
            }
            this.baseUrl = endpoint + API_VERSION;
        });
    }
    request(method, url, queryobject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const apiUrl = url.startsWith("/") ? (this.baseUrl + url) : (this.baseUrl + "/" + url);
            const fullUrl = queryobject ? util_1.addQueryToURL(apiUrl, queryobject) : apiUrl;
            const response = yield node_fetch_1.default(fullUrl, {
                method: method,
                body,
                headers: {
                    "Authorization": this.authHeader,
                }
            }).then(res => res.json());
            // #FIXME: This has no error handling.
            return response;
        });
    }
    get(url, queryobject, body) {
        return this.request("GET", url, queryobject, body);
    }
    getAccountDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get("");
        });
    }
    getLists() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get("lists");
        });
    }
}
exports.Mailchimp = Mailchimp;
