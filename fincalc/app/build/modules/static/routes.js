"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const staticAssets = require("./controller");
const routeInfo = [
    {
        name: "Static Assets",
        route: "/static/:resource(.+)",
        methods: "GET",
        handlers: staticAssets.staticAssets,
    },
    {
        name: "Public Upload Assets",
        route: "/uploads/public/:resource(.+)",
        methods: "GET",
        handlers: staticAssets.publicUploadAssets,
    }
];
exports.default = routeInfo;
