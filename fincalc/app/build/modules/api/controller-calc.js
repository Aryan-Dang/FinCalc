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
const calculator_1 = require("../../models/calculator");
const api_1 = require("./api");
const calc_1 = require("./api-models/calc");
const class_validator_1 = require("class-validator");
const app_1 = require("../../util/app");
const util_1 = require("../../models/util");
const shortid = require("shortid");
const common_1 = require("./api-models/common");
/**
 * Gets a calculator by ID.
 * Will only return a calculator with an ID
 * If it is owned by the current user's orgzanization.
 */
function get(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached calculator/get endpoint without authorization.");
        const getInput = new calc_1.CalculatorGetRequest(request.query, context.params["id"]);
        // validation:
        const validationErrors = class_validator_1.validateSync(getInput);
        if (validationErrors && validationErrors.length) {
            return api_1.default.verrors(context, validationErrors);
        }
        const uuid = getInput.uuid;
        const fields = getInput.fields ? getInput.fields.split(",").filter(calculator_1.isCalculatorColumn) : [];
        // We make sure that the org_uuid field is present if we're filtering fields.
        // It is necessary for checking ownership of the calculator.
        if (fields.length > 0 && fields.indexOf("org_uuid") < 0) {
            fields.push("org_uuid");
        }
        // #FIXME: Maybe I shouldn't just allow anyone to fetch all of the fields of a calculator.
        //         would make some sense to have some of the fields be protected in the future.
        const calculator = yield calculator_1.CalcRepo.getByUUID(uuid, fields);
        if (calculator && calculator.org_uuid === userAuth.orgUUID) {
            return api_1.default.success(context, new calc_1.FullCalculatorResponse(calculator));
        }
        else {
            return api_1.default.error(context, "Calculator with UUID not found.", api_1.default.codes.NotFound);
        }
    });
}
exports.get = get;
/**
 * Updates a calculator by ID.
 */
function update(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached calculator/update endpoint without authorization.");
        const calculatorInput = new calc_1.CalculatorUpdateInput(request.body, context.params["id"]);
        // validation:
        const validationErrors = class_validator_1.validateSync(calculatorInput);
        if (validationErrors && validationErrors.length) {
            return api_1.default.verrors(context, validationErrors);
        }
        // update:
        const filtered = calculator_1.CalcRepo.calculatorEditFilter.filter(calculatorInput);
        const updated = yield calculator_1.CalcRepo.updateByUUID(calculatorInput.uuid, filtered);
        if (updated) {
            return api_1.default.success(context, true);
        }
        else {
            return api_1.default.error(context, "Bad fields provided to calculator.");
        }
    });
}
exports.update = update;
/**
 * Deletes a calculator by ID.
 */
function del(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached calculator/delete endpoint without authorization.");
        const deleteRequest = new calc_1.CalculatorDeleteRequest(context.params["id"]);
        // validation:
        const validationErrors = class_validator_1.validateSync(deleteRequest);
        if (validationErrors && validationErrors.length) {
            return api_1.default.verrors(context, validationErrors);
        }
        // check permissions:
        const calculator = yield calculator_1.CalcRepo.getByUUID(deleteRequest.uuid, ["org_uuid"]);
        if (calculator && calculator.org_uuid === userAuth.orgUUID) {
            const deleted = yield calculator_1.CalcRepo.deleteByUUID(deleteRequest.uuid);
            if (deleted) {
                return api_1.default.success(context, true);
            }
            else {
                return api_1.default.error(context, "Failed to delete the calculator.", api_1.default.codes.BadRequest);
            }
        }
        return api_1.default.error(context, "Calculator with UUID not found for user.", api_1.default.codes.NotFound);
    });
}
exports.del = del;
/**
 * Used to create a new calculator.
 */
function create(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached calculator/create endpoint without authorization.");
        const shortId = shortid.generate();
        const calculatorInput = new calc_1.CalculatorCreateInput(request.body, userAuth.orgUUID, shortId);
        // validation:
        const validationErrors = class_validator_1.validateSync(calculatorInput);
        if (validationErrors && validationErrors.length) {
            return api_1.default.verrors(context, validationErrors);
        }
        // creation:
        const UUID = yield calculator_1.CalcRepo.insert(calculatorInput);
        const response = { uuid: UUID };
        return api_1.default.success(context, response);
    });
}
exports.create = create;
/**
 * Used to get a list of calculators for a user.
 */
function list(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached calculator/list endpoint without authorization.");
        const listInput = new common_1.ModelListRequest(request.query);
        const fields = listInput.fields ? listInput.fields.split(",").filter(calculator_1.isCalculatorColumn) : [];
        const orderBy = calculator_1.isCalculatorColumn(listInput.order_by) ? listInput.order_by : "created_at";
        const orderDir = util_1.DBOrdering.isDir(listInput.order_dir) ? listInput.order_dir : util_1.DBOrdering.DESC;
        const order = util_1.DBOrdering.single(orderBy, orderDir);
        const calculators = yield calculator_1.CalcRepo.getAllByOrgUUID(userAuth.orgUUID, fields, order);
        const response = { calculators };
        return api_1.default.success(context, response);
    });
}
exports.list = list;
/**
 * This returns the schema used for different types of calculators.
 * (their fields, colors, ect.)
 */
function schemas(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return api_1.default.success(context, calc_1.calculatorSchemas);
    });
}
exports.schemas = schemas;
