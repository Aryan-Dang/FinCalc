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
const index_1 = require("../../../util/index");
class LoginCredentials {
    constructor(src) {
        this.email = undefined;
        this.password = undefined;
        if (src) {
            index_1.copyIntoDestination(src, this);
        }
    }
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.Length(3, 256),
    __metadata("design:type", String)
], LoginCredentials.prototype, "email", void 0);
__decorate([
    class_validator_1.Length(6),
    __metadata("design:type", String)
], LoginCredentials.prototype, "password", void 0);
exports.LoginCredentials = LoginCredentials;
class RefreshInfo {
    constructor(src) {
        this.refresh = undefined;
        if (src) {
            index_1.copyIntoDestination(src, this);
        }
    }
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], RefreshInfo.prototype, "refresh", void 0);
exports.RefreshInfo = RefreshInfo;
class SignupInfo {
    constructor(src) {
        this.email = undefined;
        this.password = undefined;
        this.first_name = undefined;
        this.last_name = undefined;
        this.org_name = undefined;
        if (src) {
            index_1.copyIntoDestination(src, this);
        }
    }
}
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.Length(3, 256),
    __metadata("design:type", String)
], SignupInfo.prototype, "email", void 0);
__decorate([
    class_validator_1.Length(6, 256),
    __metadata("design:type", String)
], SignupInfo.prototype, "password", void 0);
__decorate([
    class_validator_1.Length(1, 32, {
        message: "first name must be between 1 and 32 characters long."
    }),
    __metadata("design:type", String)
], SignupInfo.prototype, "first_name", void 0);
__decorate([
    class_validator_1.Length(1, 32, {
        message: "last name must be between 1 and 32 characters long."
    }),
    __metadata("design:type", String)
], SignupInfo.prototype, "last_name", void 0);
__decorate([
    class_validator_1.Length(6, 64, {
        message: "organization name must be between 6 and 64 characters long."
    }),
    __metadata("design:type", String)
], SignupInfo.prototype, "org_name", void 0);
exports.SignupInfo = SignupInfo;
class LoginResponse {
    constructor(token, expiresIn, refresh, refreshExpiresIn) {
        this.token = token;
        this.expiresIn = expiresIn;
        this.refresh = refresh;
        this.refreshExpiresIn = refreshExpiresIn;
    }
}
exports.LoginResponse = LoginResponse;
class SignupResponse {
    constructor(src) {
        this.org_uuid = undefined;
        this.user_uuid = undefined;
        index_1.copyIntoDestination(src, this);
    }
}
exports.SignupResponse = SignupResponse;
