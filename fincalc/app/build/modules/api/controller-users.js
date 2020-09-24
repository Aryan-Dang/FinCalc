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
const user_1 = require("../../models/user");
const app_1 = require("../../util/app");
const user_2 = require("./api-models/user");
const api_1 = require("./api");
const iid_1 = require("../../models/iid");
const org_1 = require("../../models/org");
const class_validator_1 = require("class-validator");
const file_uploads_1 = require("../util/file-uploads");
const sharp = require("sharp");
function me(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached me endpoint without authorization.");
        const user = yield user_1.UserRepo.getByUUID(userAuth.userUUID);
        // setCookieAuth(context);
        return api_1.default.success(context, new user_2.FullUserResponse(user, context));
    });
}
exports.me = me;
function meAndOrg(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached endpoint without authorization.");
        const user = yield user_1.UserRepo.getByUUID(userAuth.userUUID);
        const org = yield org_1.OrgRepo.getByUUID(userAuth.orgUUID);
        return api_1.default.success(context, {
            user: new user_2.FullUserResponse(user, context),
            org: new user_2.FullOrgResponse(org)
        });
    });
}
exports.meAndOrg = meAndOrg;
function hasUsedKey(obj) {
    for (const key in obj) {
        if (typeof obj[key] !== "undefined")
            return true;
    }
    return false;
}
function updateUser(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached endpoint without authorization.");
        const userInput = new user_2.UserInput(context.request.body);
        // validation:
        const validationErrors = class_validator_1.validateSync(userInput, { skipMissingProperties: true });
        if (validationErrors && validationErrors.length) {
            return api_1.default.verrors(context, validationErrors);
        }
        if (hasUsedKey(userInput)) {
            yield user_1.UserRepo.updateByUUID(userAuth.userUUID, userInput);
        }
        return api_1.default.success(context, true);
    });
}
exports.updateUser = updateUser;
function updateOrg(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached endpoint without authorization.");
        const orgInput = new user_2.OrgInput(context.request.body);
        // validation:
        const validationErrors = class_validator_1.validateSync(orgInput, { skipMissingProperties: true });
        if (validationErrors && validationErrors.length) {
            return api_1.default.verrors(context, validationErrors);
        }
        if (hasUsedKey(orgInput)) {
            yield org_1.OrgRepo.updateByUUID(userAuth.orgUUID, orgInput);
        }
        return api_1.default.success(context, true);
    });
}
exports.updateOrg = updateOrg;
function getIID(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached me endpoint without authorization.");
        const iid = yield iid_1.InternalId.createInternalUUID(userAuth.userUUID, "userid");
        return api_1.default.success(context, { iid });
    });
}
exports.getIID = getIID;
function uploadUserProfileImg(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached me endpoint without authorization.");
        const { request } = context;
        const uploadedProfileImage = (request.body && request.body.files && request.body.files.profileimg) || null;
        if (!uploadedProfileImage) {
            return api_1.default.error(context, "Must upload a file.");
        }
        if (!file_uploads_1.allowedImagesFiles.has(uploadedProfileImage.type)) {
            return api_1.default.error(context, "This type of file is not allowed for profile images. (png, jpeg)");
        }
        const user = yield user_1.UserRepo.getByUUID(userAuth.userUUID, ["profile_img"]);
        if (!user) {
            return api_1.default.error(context, "No user with the given ID.");
        }
        const uploadedProfileImagePath = (yield file_uploads_1.randomUploadPath("public")) + ".png";
        yield sharp(uploadedProfileImage.path)
            .resize(64, 64)
            .background({ r: 0, g: 0, b: 0, alpha: 0 })
            .embed()
            .toFormat(sharp.format.png)
            .toFile(uploadedProfileImagePath);
        yield user_1.UserRepo.updateByUUID(userAuth.userUUID, { profile_img: uploadedProfileImagePath });
        if (user.profile_img) {
            yield file_uploads_1.deleteFileSilent(user.profile_img);
        }
        return api_1.default.success(context, { profile_img: uploadedProfileImagePath });
    });
}
exports.uploadUserProfileImg = uploadUserProfileImg;
function uploadOrgBrandingImage(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached me endpoint without authorization.");
        const { request } = context;
        const uploadedBrandingImage = (request.body && request.body.files && request.body.files.brandingimg) || null;
        if (!uploadedBrandingImage) {
            return api_1.default.error(context, "Must upload a file.");
        }
        if (!file_uploads_1.allowedImagesFiles.has(uploadedBrandingImage.type)) {
            return api_1.default.error(context, "This type of file is not allowed for branding images. (png, jpeg)");
        }
        const org = yield org_1.OrgRepo.getByUUID(userAuth.orgUUID, ["branding_img"]);
        if (!org) {
            return api_1.default.error(context, "No organization with the given ID.");
        }
        const uploadedBrandingImagePath = (yield file_uploads_1.randomUploadPath("public")) + ".png";
        yield sharp(uploadedBrandingImage.path)
            .resize(400, 96)
            .background({ r: 0, g: 0, b: 0, alpha: 0 })
            .embed()
            .toFormat(sharp.format.png)
            .toFile(uploadedBrandingImagePath);
        yield org_1.OrgRepo.updateByUUID(userAuth.orgUUID, { branding_img: uploadedBrandingImagePath });
        if (org.branding_img) {
            yield file_uploads_1.deleteFileSilent(org.branding_img);
        }
        return api_1.default.success(context, { branding_img: uploadedBrandingImagePath });
    });
}
exports.uploadOrgBrandingImage = uploadOrgBrandingImage;
