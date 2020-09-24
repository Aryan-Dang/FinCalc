"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dashboard = require("./dashboard-controller");
const Calculator = require("./calculator-controller");
const LoanOfficerApp = require("./los-controller");
const metrics_1 = require("../../util/metrics");
const routeInfo = [
    {
        name: "Dashboard",
        route: "/dashboard/:resource(.*)",
        methods: "GET",
        handlers: Dashboard.dashboard,
    },
    {
        name: "Dashboard",
        route: "/dashboard",
        methods: "GET",
        handlers: Dashboard.dashboard,
    },
    {
        name: "Calculator",
        route: "/calculator/:shortid",
        methods: "GET",
        handlers: [metrics_1.attachMetricsIds, Calculator.calculator]
    },
    {
        name: "Calculator Static",
        route: "/calc-static/:resource(.*)",
        methods: "GET",
        handlers: Calculator.calculatorStatic
    },
    {
        name: "LOS Page",
        route: "/los/:slug",
        methods: "GET",
        handlers: LoanOfficerApp.los,
    },
];
exports.default = routeInfo;
