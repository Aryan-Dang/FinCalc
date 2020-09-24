"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const staticPages = require("./controller");
const routeInfo = [
    {
        name: "Home Page (index)",
        route: "/",
        methods: "GET",
        handlers: staticPages.home,
    },
    {
        name: "Home Page",
        route: "/home",
        methods: "GET",
        handlers: staticPages.home,
    },
];
exports.default = routeInfo;
