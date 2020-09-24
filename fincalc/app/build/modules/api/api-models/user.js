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
const index_1 = require("../../../util/index");
const class_validator_1 = require("class-validator");
class UserInput {
    constructor(src) {
        this.first_name = undefined;
        this.last_name = undefined;
        if (src)
            index_1.copyIntoDestination(src, this);
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserInput.prototype, "first_name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UserInput.prototype, "last_name", void 0);
exports.UserInput = UserInput;
class OrgInput {
    constructor(src) {
        this.name = undefined;
        if (src)
            index_1.copyIntoDestination(src, this);
    }
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], OrgInput.prototype, "name", void 0);
exports.OrgInput = OrgInput;
class FullUserResponse {
    constructor(src, context) {
        this.uuid = undefined;
        this.email = undefined;
        this.first_name = undefined;
        this.last_name = undefined;
        this.profile_img = undefined;
        this.last_login_at = undefined;
        this.org_uuid = undefined;
        this.created_at = undefined;
        this.updated_at = undefined;
        index_1.copyIntoDestination(src, this);
        if (context) {
            this._links = {};
            if (this.org_uuid) {
                this._links["org"] = context.createUrl("/api/org/" + this.org_uuid);
            }
        }
    }
}
exports.FullUserResponse = FullUserResponse;
class FullOrgResponse {
    constructor(src) {
        this.uuid = undefined;
        this.name = undefined;
        this.branding_img = undefined;
        this.created_at = undefined;
        this.updated_at = undefined;
        index_1.copyIntoDestination(src, this);
    }
}
exports.FullOrgResponse = FullOrgResponse;
