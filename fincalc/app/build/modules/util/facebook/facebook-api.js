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
const facebook_config_1 = require("./facebook-config");
const logging_1 = require("../../../logging");
const node_fetch_1 = require("node-fetch");
const util_1 = require("../../../util");
const Logger = logging_1.newChildLogger("facebook");
class Facebook {
    constructor(accessToken, appId, appSecret) {
        this.localMode = true;
        this.localAccessToken = accessToken;
        this.accessToken = accessToken;
        this.appId = appId;
        this.appSecret = appSecret;
    }
    static newInstance(accessTokenOrConn, appId, appSecret) {
        let accessToken;
        if (typeof accessTokenOrConn === "string") {
            accessToken = accessTokenOrConn;
        }
        else {
            accessToken = accessTokenOrConn.access_token;
        }
        appId = appId || facebook_config_1.FacebookConfig.appId;
        appSecret = appSecret || facebook_config_1.FacebookConfig.appSecret;
        return new Facebook(accessToken, appId, appSecret);
    }
    static fetchAppAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const fullUrl = util_1.addQueryToURL("https://graph.facebook.com/v2.5/oauth/access_token", {
                client_id: facebook_config_1.FacebookConfig.appId,
                client_secret: facebook_config_1.FacebookConfig.appSecret,
                grant_type: "client_credentials"
            });
            const response = yield node_fetch_1.default(fullUrl).then(res => res.json());
            if (typeof response["error"] === "object") {
                Logger.error(response["error"], "Error occurred while fetching Facebook app access token.");
                throw new FacebookError(response["error"]);
            }
            else {
                if (typeof response["access_token"] === "string") {
                    Facebook.appAccessToken = response["access_token"];
                }
                else {
                    throw new Error("Bad access token response.");
                }
            }
        });
    }
    useAppAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Facebook.appAccessToken === undefined) {
                yield Facebook.fetchAppAccessToken();
            }
            if (Facebook.appAccessToken) {
                this.accessToken = Facebook.appAccessToken;
            }
            else {
                throw new Error("Tried to use bad (undefined) app access token.");
            }
            this.localMode = false;
        });
    }
    useLocalAccessToken() {
        this.accessToken = this.localAccessToken;
        this.localMode = true;
    }
    setLocalAccessToken(token) {
        this.localAccessToken = token;
        if (this.localMode) {
            this.accessToken = this.localAccessToken;
        }
    }
    graphGet(url, queryobject) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.graphRequest("GET", url, queryobject);
        });
    }
    graphPost(url, queryobject) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.graphRequest("POST", url, queryobject);
        });
    }
    graphDelete(url, queryobject) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.graphRequest("DELETE", url, queryobject);
        });
    }
    graphRequest(method, url, queryobject, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const GRAPH_URL = "https://graph.facebook.com/v2.5/";
            const resolvedUrl = url.startsWith("/") ? GRAPH_URL + url.substr(1) : GRAPH_URL + url;
            const accessQueryObject = queryobject ? Object.assign({ access_token: this.accessToken }, queryobject) : { access_token: this.accessToken };
            const fullurl = util_1.addQueryToURL(resolvedUrl, accessQueryObject);
            const response = yield node_fetch_1.default(fullurl, {
                method: method,
                body
            }).then(res => res.json());
            if (typeof response["error"] === "object") {
                Logger.error(response["error"], "Error occurred while using Facebook API.");
                throw new FacebookError(response["error"]);
            }
            return response;
        });
    }
    graphGetPagination(url, queryobject) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstPage = yield this.graphGet(url, queryobject);
            return new FacebookPagination(this, firstPage);
        });
    }
}
Facebook.appAccessToken = undefined;
exports.Facebook = Facebook;
class FacebookPagination {
    constructor(fb, currentPageData) {
        this.fb = fb;
        this.currentPageData = currentPageData;
    }
    get currentPageResp() {
        return this.currentPageData;
    }
    get currentPage() {
        return this.currentPageData.data;
    }
    hasNext() {
        const paging = this.currentPageData.paging;
        return !!paging && !!paging.next && paging.next.length > 0;
    }
    hasPrevious() {
        const paging = this.currentPageData.paging;
        return !!paging && !!paging.previous && paging.previous.length > 0;
    }
    nextPage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hasNext())
                return null;
            this.currentPageData = (yield this.fb.graphGet(this.currentPageData.paging.next));
            return this.currentPageData;
        });
    }
    previousPage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hasPrevious())
                return null;
            this.currentPageData = (yield this.fb.graphGet(this.currentPageData.paging.previous));
            return this.currentPageData;
        });
    }
    collect() {
        return __awaiter(this, void 0, void 0, function* () {
            const acc = this.currentPageData.data.slice(0);
            while (this.hasNext()) {
                const resp = yield this.nextPage();
                if (resp) {
                    const len = resp.data.length;
                    for (let idx = 0; idx < len; idx++) {
                        acc.push(resp.data[idx]);
                    }
                }
            }
            return acc;
        });
    }
    collectRev() {
        return __awaiter(this, void 0, void 0, function* () {
            const acc = this.currentPageData.data.slice(0);
            while (this.previousPage()) {
                const resp = yield this.previousPage();
                if (resp) {
                    const len = resp.data.length;
                    for (let idx = 0; idx < len; idx++) {
                        acc.push(resp.data[idx]);
                    }
                }
            }
            return acc;
        });
    }
}
exports.FacebookPagination = FacebookPagination;
class FacebookError extends Error {
    constructor(err) {
        super(typeof err === "string" ? err : (typeof err === "object" && typeof err["message"] === "string" ? err["message"] : "Unknown Facebook Error."));
        this.err = err;
    }
}
exports.FacebookError = FacebookError;
