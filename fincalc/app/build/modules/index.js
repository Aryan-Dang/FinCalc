"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const logging_1 = require("../logging");
const routes_1 = require("./pages/routes");
const routes_2 = require("./static/routes");
const routes_3 = require("./app/routes");
const routes_4 = require("./api/routes");
const routes_5 = require("./extern/routes");
const Logger = logging_1.newChildLogger("router.modules");
const modules = [
    ...routes_1.default,
    ...routes_2.default,
    ...routes_4.default,
    ...routes_3.default,
    ...routes_5.default,
];
function initializeModules(app) {
    const router = new Router();
    modules.forEach((module) => {
        let methods;
        if (Array.isArray(module.methods)) {
            methods = module.methods;
        }
        else {
            methods = [module.methods];
        }
        let middleware;
        if (Array.isArray(module.handlers)) {
            middleware = module.handlers;
        }
        else {
            middleware = [module.handlers];
        }
        methods.forEach((method) => {
            switch (method.toLowerCase()) {
                case "get":
                    router.get(module.route, ...middleware);
                    break;
                case "put":
                    router.put(module.route, ...middleware);
                    break;
                case "post":
                    router.post(module.route, ...middleware);
                    break;
                case "options":
                    router.options(module.route, ...middleware);
                    break;
                case "delete":
                    router.del(module.route, ...middleware);
                    break;
                case "head":
                    router.head(module.route, ...middleware);
                    break;
                case "patch":
                    router.patch(module.route, ...middleware);
                    break;
                case "trace": throw new Error("Cannot use HTTP TRACE method with Koa-Router at the moment.");
                case "connect": throw new Error("Cannot use HTTP CONNECT method with Koa-Router at the moment.");
                default: throw new Error(`Unknown HTTP method ${method}.`);
            }
        });
        let name = module.name ? module.name : "";
        let desc = module.name ? ` (${module.route.toString()})` : module.route.toString();
        Logger.info("registered route module %s%s", name, desc);
    });
    app.use(router.routes()).use(router.allowedMethods());
    Logger.info("initialized route modules");
}
exports.initializeModules = initializeModules;
