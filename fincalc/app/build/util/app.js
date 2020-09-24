"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class App {
    static assert(condition, message) {
        if (!condition) {
            throw new AppAssertError(message);
        }
    }
    static assertExists(x, message) {
        if (!x) {
            throw new AppAssertError(message);
        }
        else {
            return x;
        }
    }
}
exports.App = App;
class AppError extends Error {
    constructor(message) {
        super(`AppError [${message}]`);
    }
}
exports.AppError = AppError;
class AppAssertError extends AppError {
    constructor(message) {
        super(`AppAssertError [${message}]`);
    }
}
exports.AppAssertError = AppAssertError;
