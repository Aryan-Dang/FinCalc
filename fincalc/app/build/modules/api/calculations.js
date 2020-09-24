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
const common_calc_types_1 = require("../../calc-types/common-calc-types");
const class_validator_1 = require("class-validator");
const index_1 = require("../../util/index");
exports.calculatorFunctions = {};
class StandardLoanParams {
    constructor(src) {
        this["Loan Amount"] = undefined;
        this["Down Payment"] = undefined;
        this["Interest Rate"] = undefined;
        this["Term Length"] = undefined;
        if (src)
            index_1.copyIntoDestination(src, this);
    }
}
__decorate([
    class_validator_1.IsPositive(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], StandardLoanParams.prototype, "Loan Amount", void 0);
__decorate([
    class_validator_1.IsPositive(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], StandardLoanParams.prototype, "Down Payment", void 0);
__decorate([
    class_validator_1.IsPositive(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], StandardLoanParams.prototype, "Interest Rate", void 0);
__decorate([
    class_validator_1.IsPositive(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], StandardLoanParams.prototype, "Term Length", void 0);
exports.StandardLoanParams = StandardLoanParams;
class StandardLoanNoDownParams {
    constructor(src) {
        this["Loan Amount"] = undefined;
        this["Interest Rate"] = undefined;
        this["Term Length"] = undefined;
        if (src)
            index_1.copyIntoDestination(src, this);
    }
}
__decorate([
    class_validator_1.IsPositive(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], StandardLoanNoDownParams.prototype, "Loan Amount", void 0);
__decorate([
    class_validator_1.IsPositive(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], StandardLoanNoDownParams.prototype, "Interest Rate", void 0);
__decorate([
    class_validator_1.IsPositive(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], StandardLoanNoDownParams.prototype, "Term Length", void 0);
exports.StandardLoanNoDownParams = StandardLoanNoDownParams;
exports.calculatorFunctions[common_calc_types_1.CalculatorType.AutoLoan] = (rawParams) => {
    const params = new StandardLoanParams(rawParams);
    const validationErrors = class_validator_1.validateSync(params);
    if (validationErrors && validationErrors.length) {
        return [false, validationErrors];
    }
    const loanAmount = params["Loan Amount"];
    const downPayment = params["Down Payment"];
    const interestRate = params["Interest Rate"];
    const termLength = params["Term Length"];
    const monthlyPayment = paymentsPerPeriod(loanAmount - downPayment, interestRate / 100 / 12, termLength);
    const interestPayment = (interestRate / 100) * monthlyPayment;
    const principalPayment = monthlyPayment - interestPayment;
    return [true, params, {
            monthlyPayment: dollar(monthlyPayment),
            interestPayment: dollar(interestPayment),
            principalPayment: dollar(principalPayment),
            graph: {
                "Principal Payment": dollar(principalPayment),
                "Interest Payment": dollar(interestPayment),
            }
        }];
};
// These just use the same functionality.
exports.calculatorFunctions[common_calc_types_1.CalculatorType.BoatRVLoan] = exports.calculatorFunctions[common_calc_types_1.CalculatorType.BoatRVLoan];
exports.calculatorFunctions[common_calc_types_1.CalculatorType.Mortgage] = exports.calculatorFunctions[common_calc_types_1.CalculatorType.AutoLoan];
// Personal Loan is the same as auto loan minus the down payment.
exports.calculatorFunctions[common_calc_types_1.CalculatorType.PersonalLoan] = (rawParams) => {
    const params = new StandardLoanNoDownParams(rawParams);
    const validationErrors = class_validator_1.validateSync(params);
    if (validationErrors && validationErrors.length) {
        return [false, validationErrors];
    }
    const loanAmount = params["Loan Amount"];
    const interestRate = params["Interest Rate"];
    const termLength = params["Term Length"];
    const monthlyPayment = paymentsPerPeriod(loanAmount, interestRate / 100 / 12, termLength);
    const interestPayment = (interestRate / 100) * monthlyPayment;
    const principalPayment = monthlyPayment - interestPayment;
    return [true, params, {
            monthlyPayment: dollar(monthlyPayment),
            interestPayment: dollar(interestPayment),
            principalPayment: dollar(principalPayment),
            graph: {
                "Principal Payment": dollar(principalPayment),
                "Interest Payment": dollar(interestPayment),
            }
        }];
};
// #FIXME: These probably shouldn't be the same, I remember mortgage having some tax stuff in it.
/**
 * Returns payment per period. Used for when taking out loans.
 * @param l The amount you borrow.
 * @param r Interest rate per period.
 * @param t The number of periods
 */
function paymentsPerPeriod(l, r, t) {
    return (l * r) / (1 - Math.pow(1 + r, -1 * t));
}
function dollar(x) {
    return parseFloat(x.toFixed(2)) || 0;
}
