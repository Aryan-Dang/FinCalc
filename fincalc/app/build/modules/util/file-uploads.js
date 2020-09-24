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
const config = require("config");
const mkpath = require("mkpath");
const uuidv4 = require("uuid/v4");
const Path = require("path");
const FileSystem = require("mz/fs");
const logging_1 = require("../../logging");
const Logger = logging_1.newChildLogger("uploads");
exports.uploadDir = config.get("server.uploadDir");
exports.allowedImagesFiles = new Set([
    "image/png",
    "image/jpeg"
]);
function _mkpath(path) {
    return new Promise((resolve, reject) => {
        mkpath(path, (err) => {
            if (err)
                reject(err);
            else
                resolve();
        });
    });
}
function createUploadDir() {
    return __awaiter(this, void 0, void 0, function* () {
        yield _mkpath(exports.uploadDir);
    });
}
exports.createUploadDir = createUploadDir;
function createUploadDirSync() {
    mkpath.sync(exports.uploadDir);
}
exports.createUploadDirSync = createUploadDirSync;
function randomUploadPath(...intermediate) {
    return __awaiter(this, void 0, void 0, function* () {
        const uuid = uuidv4();
        const firstdir = "u_" + uuid.substr(0, 1).toUpperCase();
        const seconddir = "u_" + uuid.substr(1, 1).toUpperCase();
        const dirpath = Path.join(exports.uploadDir, ...intermediate, firstdir, seconddir);
        yield _mkpath(dirpath);
        return Path.join(dirpath, uuid);
    });
}
exports.randomUploadPath = randomUploadPath;
function getFilesFromBody(body) {
    if (typeof body === "object" && !!body) {
        if (typeof body["files"] === "object" && !!body["files"]) {
            if (Array.isArray(body["files"]))
                return body["files"];
            else
                return [body["files"]];
        }
        if (typeof body["file"] === "object" && !!body["file"]) {
            if (Array.isArray(body["file"]))
                return body["file"];
            else
                return [body["file"]];
        }
    }
    return [];
}
exports.getFilesFromBody = getFilesFromBody;
function getFirstFileFromBody(body) {
    if (typeof body === "object" && !!body) {
        if (typeof body["files"] === "object" && !!body["files"]) {
            if (Array.isArray(body["files"]))
                return body["files"][0];
            else
                return body["files"];
        }
        if (typeof body["file"] === "object" && !!body["file"]) {
            if (Array.isArray(body["file"]))
                return body["file"][0];
            else
                return body["file"];
        }
    }
    return null;
}
exports.getFirstFileFromBody = getFirstFileFromBody;
function deleteFileSilent(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield FileSystem.unlink(filepath);
        }
        catch (e) {
            Logger.error(e, "Failed to delete file: " + filepath);
        }
    });
}
exports.deleteFileSilent = deleteFileSilent;
