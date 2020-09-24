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
const mailchimp_config_1 = require("../util/mailchimp/mailchimp-config");
const iid_1 = require("../../models/iid");
const app_1 = require("../../util/app");
const extern_1 = require("../../models/extern");
const facebook_api_1 = require("../util/facebook/facebook-api");
const api_1 = require("./api");
const mailchimp_api_1 = require("../util/mailchimp/mailchimp-api");
const remote_cache_1 = require("../../util/remote-cache");
function createFacebookConnectURL(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentAuth = app_1.App.assertExists(context.currentAuth, "Reached authorized route without auth.");
        const internalId = yield iid_1.InternalId.createInternalUUID(currentAuth.orgUUID, "facebook-connect-org-uuid", "hour");
        const url = context.createUrl(`https://www.facebook.com/v2.11/dialog/oauth`, {
            client_id: facebook_config_1.FacebookConfig.appId,
            redirect_uri: context.createUrl("/facebook/connect-redirect/" + internalId),
            scope: "public_profile,manage_pages,pages_show_list"
        });
        return api_1.default.success(context, url);
    });
}
exports.createFacebookConnectURL = createFacebookConnectURL;
function createMailchimpConnectURL(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentAuth = app_1.App.assertExists(context.currentAuth, "Reached authorized route without auth.");
        const internalId = yield iid_1.InternalId.createInternalUUID(currentAuth.orgUUID, "mailchimp-connect-org-uuid", "hour");
        const url = context.createUrl(mailchimp_config_1.MailchimpConfig.authorizeURI, {
            response_type: "code",
            client_id: mailchimp_config_1.MailchimpConfig.clientId,
            redirect_uri: context.createUrl("/mailchimp/connect-redirect/" + internalId)
        });
        return api_1.default.success(context, url);
    });
}
exports.createMailchimpConnectURL = createMailchimpConnectURL;
function getCurrentMailchimpUser(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentAuth = app_1.App.assertExists(context.currentAuth, "Reached authorized route without auth.");
        const mailchimpConn = yield extern_1.ExternRepo.getMailchimpConnection(currentAuth.orgUUID);
        if (mailchimpConn) {
            const remoteCacheKey = `mc:${mailchimpConn.org_uuid}:cur-user`;
            const cached = yield remote_cache_1.default.get(remoteCacheKey);
            if (cached) {
                return api_1.default.success(context, cached);
            }
            const mailchimp = yield mailchimp_api_1.Mailchimp.newInstance(mailchimpConn.access_token);
            const accountDetails = yield mailchimp.getAccountDetails();
            const prunedAccountDetails = {
                account_id: accountDetails.account_id,
                login_id: accountDetails.login_id,
                account_name: accountDetails.account_name,
                email: accountDetails.email,
                first_name: accountDetails.first_name,
                last_name: accountDetails.last_name,
                username: accountDetails.username,
                avatar_url: accountDetails.avatar_url,
            };
            const result = { info: prunedAccountDetails };
            yield remote_cache_1.default.setex(remoteCacheKey, result, 60);
            return api_1.default.success(context, result);
        }
        else {
            return api_1.default.success(context, { info: null });
        }
    });
}
exports.getCurrentMailchimpUser = getCurrentMailchimpUser;
function getMailchimpLists(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentAuth = app_1.App.assertExists(context.currentAuth, "Reached authorized route without auth.");
        const mailchimpConn = yield extern_1.ExternRepo.getMailchimpConnection(currentAuth.orgUUID);
        if (mailchimpConn) {
            const remoteCacheKey = `mc:${mailchimpConn.org_uuid}:lists`;
            const cached = yield remote_cache_1.default.get(remoteCacheKey);
            if (cached) {
                return api_1.default.success(context, cached);
            }
            const mailchimp = yield mailchimp_api_1.Mailchimp.newInstance(mailchimpConn.access_token);
            const response = yield mailchimp.getLists();
            let result;
            if (response.lists) {
                const lists = response.lists.map((list) => ({
                    id: list.id,
                    web_id: list.web_id,
                    name: list.name
                }));
                result = { lists: lists };
            }
            else {
                result = { lists: null };
            }
            yield remote_cache_1.default.setex(remoteCacheKey, result, 30);
            return api_1.default.success(context, result);
        }
        else {
            return api_1.default.success(context, { lists: null });
        }
    });
}
exports.getMailchimpLists = getMailchimpLists;
function getCurrentFacebookUser(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentAuth = app_1.App.assertExists(context.currentAuth, "Reached authorized route without auth.");
        const facebookConn = yield extern_1.ExternRepo.getFacebookConnection(currentAuth.orgUUID);
        if (facebookConn) {
            const remoteCacheKey = `fb:${facebookConn.org_uuid}:cur-user`;
            const cached = yield remote_cache_1.default.get(remoteCacheKey);
            if (cached) {
                return api_1.default.success(context, cached);
            }
            const facebook = facebook_api_1.Facebook.newInstance(facebookConn);
            const [facebookInfo, accountsPagination] = yield Promise.all([
                facebook.graphGet("/me", { fields: "id,name,picture" }),
                facebook.graphGetPagination("/me/accounts", { fields: "id,name,picture" })
            ]);
            let accounts = yield accountsPagination.collect();
            if (accounts) {
                const installedTabsArr = yield extern_1.ExternRepo.getInstalledPageTabs(currentAuth.orgUUID);
                const installedTabsSet = new Set(installedTabsArr.map((item) => item.page_id));
                accounts = accounts.map((account) => {
                    const tab = installedTabsSet.has(account.id);
                    return {
                        name: account.name,
                        picture: account.picture,
                        id: account.id,
                        tab: tab
                    };
                });
            }
            const result = { info: facebookInfo, accounts: accounts };
            yield remote_cache_1.default.setex(remoteCacheKey, result, 60);
            return api_1.default.success(context, result);
        }
        else {
            return api_1.default.success(context, { info: null });
        }
    });
}
exports.getCurrentFacebookUser = getCurrentFacebookUser;
function installFBTab(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentAuth = app_1.App.assertExists(context.currentAuth, "Reached authorized route without auth.");
        const facebookConn = yield extern_1.ExternRepo.getFacebookConnection(currentAuth.orgUUID);
        const pageId = context.params["pageid"];
        if (facebookConn && typeof pageId === "string") {
            const facebook = facebook_api_1.Facebook.newInstance(facebookConn);
            const pageInfo = yield facebook.graphGet(pageId, { fields: "id,name,access_token" });
            if ((typeof pageInfo.id === "string" || typeof pageInfo.id === "number") && typeof pageInfo.access_token === "string") {
                facebook.setLocalAccessToken(pageInfo.access_token);
                try {
                    yield facebook.graphPost(`${pageInfo.id}/tabs`, {
                        app_id: facebook_config_1.FacebookConfig.appId,
                        custom_name: "Calculators",
                        position: 2,
                    });
                    yield extern_1.ExternRepo.setPageTabInstalled(currentAuth.orgUUID, pageInfo.id);
                    return api_1.default.success(context, true);
                }
                catch (err) {
                    context.logger.error(err, "Error while adding Facebook tab.");
                }
                return api_1.default.error(context, "Error occurred while adding Facebook tab.");
            }
        }
        return api_1.default.success(context, false);
    });
}
exports.installFBTab = installFBTab;
function uninstallFBTab(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentAuth = app_1.App.assertExists(context.currentAuth, "Reached authorized route without auth.");
        const facebookConn = yield extern_1.ExternRepo.getFacebookConnection(currentAuth.orgUUID);
        const pageId = context.params["pageid"];
        if (facebookConn && typeof pageId === "string") {
            const facebook = facebook_api_1.Facebook.newInstance(facebookConn);
            const pageInfo = yield facebook.graphGet(pageId, { fields: "id,name,access_token" });
            if ((typeof pageInfo.id === "string" || typeof pageInfo.id === "number") && typeof pageInfo.access_token === "string") {
                facebook.setLocalAccessToken(pageInfo.access_token);
                try {
                    yield facebook.graphDelete(`${pageInfo.id}/tabs`, {
                        tab: `app_${facebook_config_1.FacebookConfig.appId}`,
                    });
                    yield extern_1.ExternRepo.unsetPageTabInstalled(currentAuth.orgUUID, pageInfo.id);
                    return api_1.default.success(context, true);
                }
                catch (err) {
                    context.logger.error(err, "Error while removing Facebook tab.");
                }
                return api_1.default.error(context, "Error occurred while removing Facebook tab.");
            }
        }
        return api_1.default.success(context, false);
    });
}
exports.uninstallFBTab = uninstallFBTab;
function disconnectFacebook(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentAuth = app_1.App.assertExists(context.currentAuth, "Reached authorized route without auth.");
        yield extern_1.ExternRepo.deleteFacebookConnection(currentAuth.orgUUID);
        const remoteCacheKey = `fb:${currentAuth.orgUUID}:cur-user`;
        yield remote_cache_1.default.remove(remoteCacheKey);
        return api_1.default.success(context, true);
    });
}
exports.disconnectFacebook = disconnectFacebook;
function disconnectMailchimp(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const currentAuth = app_1.App.assertExists(context.currentAuth, "Reached authorized route without auth.");
        yield extern_1.ExternRepo.deleteMailchimpConnection(currentAuth.orgUUID);
        const remoteCacheKey = `mc:${currentAuth.orgUUID}:cur-user`;
        yield remote_cache_1.default.remove(remoteCacheKey);
        return api_1.default.success(context, true);
    });
}
exports.disconnectMailchimp = disconnectMailchimp;
