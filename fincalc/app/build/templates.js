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
const Pug = require("pug");
const LRU = require("lru-cache");
const Path = require("path");
const FileSystem = require("mz/fs");
const chokidar = require("chokidar");
const logging_1 = require("./logging");
const Logger = logging_1.newChildLogger("template.render");
class TemplateRenderer {
    constructor(options) {
        this.options = Object.assign({}, options); // we use a shallow copy.
        this.cache = LRU({
            length: () => 1,
            max: this.options.cache.max,
            maxAge: this.options.cache.maxAge
        });
    }
    watchTemplateChanges() {
        this.stopWatchingTemplateChanges();
        this.watcher = chokidar.watch([this.options.root], {
            persistent: true
        });
        const changeHandler = (path) => {
            const relativePath = Path.relative(this.options.root, path);
            if (!relativePath.endsWith(".pug")) {
                this.evict(relativePath + ".pug");
            }
            else {
                this.evict(relativePath.substr(0, relativePath.length - 4));
            }
            this.evict(relativePath);
        };
        this.watcher
            .on("add", changeHandler)
            .on("change", changeHandler)
            .on("unlink", changeHandler);
        Logger.info("watching templates for changes at %s", this.options.root);
    }
    stopWatchingTemplateChanges() {
        if (this.watcher) {
            this.watcher.close();
            Logger.info("no longer watching templates for changes at %s", this.options.root);
        }
    }
    render(name, locals) {
        return __awaiter(this, void 0, void 0, function* () {
            let template = this.cache.get(name);
            if (!template) {
                template = yield this.loadTemplate(name);
                this.cache.set(name, template);
                Logger.info("compiled template %s", name);
            }
            const rendered = template(locals);
            return rendered;
        });
    }
    evict(name) {
        if (this.cache.has(name)) {
            this.cache.del(name);
            Logger.info("evicted template %s", name);
        }
    }
    loadTemplate(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullPath = Path.join(this.options.root, name).trim();
            const paths = [fullPath];
            if (!fullPath.endsWith(".pug")) {
                paths.push(fullPath + ".pug");
            }
            const pugFilePath = yield this.getExistingFile(paths);
            if (pugFilePath) {
                const pugFileContents = yield FileSystem.readFile(pugFilePath);
                const compiledTemplate = Pug.compile(pugFileContents.toString("utf-8"), this.options.pugOptions);
                return compiledTemplate;
            }
            else {
                throw new Error(`No template found with the name "${name}".`);
            }
        });
    }
    getExistingFile(paths) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const path of paths) {
                if (yield FileSystem.exists(path)) {
                    try {
                        const stats = yield FileSystem.stat(path);
                        if (stats.isFile()) {
                            return path;
                        }
                    }
                    catch (err) {
                        Logger.debug("error while checking stats of template path %s: ", path, err);
                    }
                }
            }
            return null;
        });
    }
}
exports.default = TemplateRenderer;
