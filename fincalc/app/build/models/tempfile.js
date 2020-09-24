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
const time_1 = require("../util/time");
const knex_1 = require("../util/knex");
class TempFileRepo {
    static createTempFile(filepath, expires_in) {
        return __awaiter(this, void 0, void 0, function* () {
            const expires_at = time_1.addDuration(new Date(), expires_in);
            yield knex_1.default("temp_files").insert({ filepath, expires_at });
        });
    }
}
exports.TempFileRepo = TempFileRepo;
