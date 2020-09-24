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
// This is the entry point for the main app server.
const config = require("config");
const Koa = require("koa");
const templates_1 = require("./templates");
const logging_1 = require("./logging");
const index_1 = require("./util/index");
const index_2 = require("./modules/index");
const URL = require("url");
const file_uploads_1 = require("./modules/util/file-uploads");
const app = new Koa;
app.proxy = true;
app.keys = [
    "d7361ea0d397d22a6c332aaa787b380c1226a40e376cc51a4af119b181373871" +
        "8a6bb47fdacfbab4f5f098e2cc3c85f55337dc5a811e0e392ffcff52a80868ba" +
        "8ac297e23996e54dc5d3a2bf942dc5a629cafaa439f7d780f77fc9a6c021e6b5" +
        "568fd6a860077e529e6505587178f327ee56ce271f8db8a9d30764615a388be8",
    "507bb3bfeae7fd78cd3cc8ea198e6ba65a97fbff6aa3f4841141f2f47869da02" +
        "f9e4b61a65888853c7c8e9c446e3f0b2e4385976d2c4989d593d506edb32017b" +
        "37440391351491c8556d691a1cf4a816c558fc51b8519c905f77202144d7c987" +
        "e1a5afd68b26cb8cae487d6e3633017ebbae46d61a425108259398a8b6fa92df"
];
/// Initializing the template renderer
const templateRenderer = new templates_1.default({
    root: config.get("app.templates.root"),
    cache: {
        max: config.get("app.templates.maxCacheSize")
    }
});
templateRenderer.watchTemplateChanges();
function renderFunction(name, locals) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this) {
            this.type = "text/html";
            this.body = yield templateRenderer.render(name, locals);
            this.status = 200;
        }
        return this;
    });
}
const serverOrigin = config.get("server.origin");
function toQueryString(queryObject) {
    let ret = '';
    if (queryObject) {
        let first = true;
        for (let key in queryObject) {
            if (queryObject[key] === undefined)
                continue;
            if (typeof queryObject[key] === "object")
                continue; // #FIXME: This should probably be an error.
            if (first)
                first = false;
            else
                ret += '&';
            ret += encodeURIComponent(key) + '=' + encodeURIComponent(queryObject[key]);
        }
    }
    return ret;
}
function addQueryToURL(url, queryObject) {
    let queryStart = url.indexOf('?');
    let hashStart = url.indexOf('#');
    if (hashStart < 0)
        hashStart = url.length;
    if (queryStart < 0)
        queryStart = hashStart;
    const endpoint = url.substr(0, queryStart);
    let query = url.substr(queryStart, hashStart - queryStart);
    const hash = url.substr(hashStart);
    const addon = toQueryString(queryObject);
    if (addon) {
        if (query[0] != '?')
            query = '?' + query;
        if (query.length > 1 && !query.endsWith('&'))
            query += '&' + addon;
        else
            query += addon;
    }
    return endpoint + query + hash;
}
function createUrl(path, queryObject) {
    const origin = serverOrigin && serverOrigin.length > 0 ? serverOrigin : this.origin || "localhost";
    const protocol = "https"; // #FIXME: I should watch out for this one, it used to be this.protocol
    const u = URL.resolve(protocol + "://" + origin, path);
    if (queryObject) {
        return addQueryToURL(u, queryObject);
    }
    else {
        return u;
    }
}
const contextLogger = logging_1.newChildLogger("request");
/// Attaching things necessary for our application to the context for every request.
app.use((context, next) => __awaiter(this, void 0, void 0, function* () {
    context.templates = templateRenderer;
    context.render = renderFunction;
    context.logger = contextLogger;
    context.createUrl = createUrl;
    context.createQueryString = toQueryString;
    yield next();
}));
/// Response time middleware.
if (config.get("app.sendResponseTimeHeader")) {
    app.use((context, next) => __awaiter(this, void 0, void 0, function* () {
        const startTime = process.hrtime();
        yield next();
        const elapsed = process.hrtime(startTime);
        const elapsedms = (elapsed[0] * 1000) + (elapsed[1] / 1000000);
        const [respTime, respTimeUnits] = index_1.reduceTime(elapsedms, "ms");
        context.set("X-Response-Time", `${respTime.toFixed(2)} ${respTimeUnits}`);
    }));
}
file_uploads_1.createUploadDirSync();
index_2.initializeModules(app);
app.listen(config.get("server.port"));
