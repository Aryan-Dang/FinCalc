"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("../modules");
const api_1 = require("./api");
const authAPI = require("./controller-auth");
const userAPI = require("./controller-users");
const calcAPI = require("./controller-calc");
const calculateAPI = require("./controller-calculate");
const leadAPI = require("./controller-leads");
const eventAPI = require("./controller-event");
const ExternAPI = require("./controller-api-extern");
const metrics_1 = require("../../util/metrics");
function endpoint(name, methods, route, ...handlers) {
    return {
        name,
        methods,
        route,
        handlers: [modules_1.defaultBodyParser, ...handlers]
    };
}
// #TODO: make this all look better ^
function endpointNoBody(name, methods, route, ...handlers) {
    return {
        name,
        methods,
        route,
        handlers: [...handlers]
    };
}
const routeInfo = [
    // Auth:
    endpoint("login", "POST", "/api/auth/login", authAPI.login),
    endpoint("signup", "POST", "/api/auth/signup", authAPI.signup),
    endpoint("refresh", "POST", "/api/auth/refresh", authAPI.refresh),
    // User
    endpoint("me", "GET", "/api/user/me", api_1.ensureAuthorization, userAPI.me),
    endpoint("me-update", "POST", "/api/user/me", api_1.ensureAuthorization, userAPI.updateUser),
    endpoint("me-org-update", "POST", "/api/user/org", api_1.ensureAuthorization, userAPI.updateOrg),
    endpoint("me+org", "GET", "/api/user/meandorg", api_1.ensureAuthorization, userAPI.meAndOrg),
    endpoint("me-iid", "GET", "/api/user/iid", api_1.ensureAuthorization, userAPI.getIID),
    endpointNoBody("user-profileimg", "POST", "/api/user/profile-img", api_1.ensureAuthorization, modules_1.multipartBodyParser, userAPI.uploadUserProfileImg),
    endpointNoBody("org-branding", "POST", "/api/user/org-branding-img", api_1.ensureAuthorization, modules_1.multipartBodyParser, userAPI.uploadOrgBrandingImage),
    // Calculator
    endpoint("calc-get", "GET", "/api/calc/list", api_1.ensureAuthorization, calcAPI.list),
    endpoint("calc-get", "GET", "/api/calc/:id", api_1.ensureAuthorization, calcAPI.get),
    endpoint("calc-update", "POST", "/api/calc/:id", api_1.ensureAuthorization, calcAPI.update),
    endpoint("calc-create", "PUT", "/api/calc/", api_1.ensureAuthorization, calcAPI.create),
    endpoint("calc-del", "DELETE", "/api/calc/:id", api_1.ensureAuthorization, calcAPI.del),
    endpoint("calc-schemas", "GET", "/api/_schema/calc", api_1.ensureAuthorization, calcAPI.schemas),
    // Lead
    endpoint("calc-gen-lead", "POST", "/api/leadgen", metrics_1.attachMetricsIds, leadAPI.generateLead),
    endpoint("leads-list", "GET", "/api/lead/list", api_1.ensureAuthorization, leadAPI.listLeads),
    endpoint("leads-list-ranged", "GET", "/api/lead/listr", api_1.ensureAuthorization, leadAPI.listLeadsInRange),
    endpoint("leads-list-ranged-csv", "GET", "/api/lead/gencsv", api_1.ensureAuthorization, leadAPI.createCSV),
    // Events
    endpoint("events-get", "GET", "/api/event/daily", api_1.ensureAuthorization, eventAPI.getEventsDaily),
    // Calculate
    endpoint("calculate", "POST", "/api/calculate/calculate", metrics_1.attachMetricsIds, calculateAPI.calculate),
    // Extern
    // ->  Facebook
    endpoint("facebook-connect-url", "GET", "/api/facebook/connect-url", api_1.ensureAuthorization, ExternAPI.createFacebookConnectURL),
    endpoint("facebook-user", "GET", "/api/facebook/user", api_1.ensureAuthorization, ExternAPI.getCurrentFacebookUser),
    endpoint("facebook-disconnect", "POST", "/api/facebook/disconnect", api_1.ensureAuthorization, ExternAPI.disconnectFacebook),
    endpoint("facebook-tab-install", "POST", "/api/facebook/tab-install/:pageid", api_1.ensureAuthorization, ExternAPI.installFBTab),
    endpoint("facebook-tab-uninstall", "POST", "/api/facebook/tab-uninstall/:pageid", api_1.ensureAuthorization, ExternAPI.uninstallFBTab),
    // -> Mailchimp
    endpoint("mailchimp-connect-url", "GET", "/api/mailchimp/connect-url", api_1.ensureAuthorization, ExternAPI.createMailchimpConnectURL),
    endpoint("mailchimp-user", "GET", "/api/mailchimp/user", api_1.ensureAuthorization, ExternAPI.getCurrentMailchimpUser),
    endpoint("mailchimp-disconnect", "POST", "/api/mailchimp/disconnect", api_1.ensureAuthorization, ExternAPI.disconnectMailchimp),
    endpoint("mailchimp-lists", "GET", "/api/mailchimp/lists", api_1.ensureAuthorization, ExternAPI.getMailchimpLists),
];
exports.default = routeInfo;
