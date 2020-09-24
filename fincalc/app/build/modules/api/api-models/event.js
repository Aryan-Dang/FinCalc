"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../../util");
const class_validator_1 = require("class-validator");
class EventGetDailyInput {
    constructor(src) {
        this.eventtypes = undefined;
        this.fields = undefined;
        this.calculator = undefined;
        this.startdate = undefined;
        this.enddate = undefined;
        if (src && typeof src === "object") {
            const srcCopy = Object.assign(src);
            if (srcCopy["startdate"]) {
                srcCopy["startdate"] = new Date(srcCopy["startdate"]);
            }
            if (srcCopy["enddate"]) {
                srcCopy["enddate"] = new Date(srcCopy["enddate"]);
            }
            util_1.copyIntoDestination(srcCopy, this);
        }
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsDefined(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], EventGetDailyInput.prototype, "eventtypes", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], EventGetDailyInput.prototype, "fields", void 0);
__decorate([
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], EventGetDailyInput.prototype, "calculator", void 0);
__decorate([
    class_validator_1.IsDate(),
    class_validator_1.IsDefined(),
    __metadata("design:type", Date)
], EventGetDailyInput.prototype, "startdate", void 0);
__decorate([
    class_validator_1.IsDate(),
    class_validator_1.IsDefined(),
    __metadata("design:type", Date)
], EventGetDailyInput.prototype, "enddate", void 0);
exports.EventGetDailyInput = EventGetDailyInput;
