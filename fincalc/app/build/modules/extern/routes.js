"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("../modules");
const FacebookController = require("./controller-facebook");
const MailchimpController = require("./controller-mailchimp");
const routeInfo = [
    // {
    //     name: "Install FaceBook Tab",
    //     route: "/facebook/install-tab",
    //     methods: "GET",
    //     handlers: [ensureAuthorizationCookies, FacebookController.installTab],
    // },
    {
        name: "End FaceBook Connect",
        route: "/facebook/connect-redirect/:uuid",
        methods: "GET",
        handlers: [FacebookController.connectEnd],
    },
    {
        name: "Facebook Page Tab",
        route: "/facebook/pagetab",
        methods: "POST",
        handlers: [modules_1.defaultBodyParser, FacebookController.renderTabContent],
    },
    {
        name: "End Mailchimp Connect",
        route: "/mailchimp/connect-redirect/:uuid",
        methods: "GET",
        handlers: [MailchimpController.connectEnd],
    },
];
exports.default = routeInfo;
