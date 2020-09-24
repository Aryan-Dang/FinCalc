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
const class_validator_1 = require("class-validator");
const util_1 = require("../../../util");
class CalculatorLead {
    constructor(src) {
        this.name = undefined;
        this.email = undefined;
        // #TODO: if this needs to go into another country we'll have a problem :P
        this.phone_number = undefined;
        this.amount = undefined;
        this.term = undefined;
        this.shortid = undefined;
        if (src)
            util_1.copyIntoDestination(src, this);
    }
}
__decorate([
    class_validator_1.MinLength(1, { message: "Must be at least one character long." }),
    __metadata("design:type", String)
], CalculatorLead.prototype, "name", void 0);
__decorate([
    class_validator_1.IsEmail({}, { message: "Must be a valid email address." }),
    __metadata("design:type", String)
], CalculatorLead.prototype, "email", void 0);
__decorate([
    class_validator_1.IsMobilePhone("en-US", { message: "Must be a phone number." }),
    __metadata("design:type", String)
], CalculatorLead.prototype, "phone_number", void 0);
__decorate([
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CalculatorLead.prototype, "amount", void 0);
__decorate([
    class_validator_1.IsPositive(),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], CalculatorLead.prototype, "term", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CalculatorLead.prototype, "shortid", void 0);
exports.CalculatorLead = CalculatorLead;
