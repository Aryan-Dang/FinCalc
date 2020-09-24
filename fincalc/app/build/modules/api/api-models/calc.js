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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("../../../calc-types/common-calc-types"));
const common_calc_types_1 = require("../../../calc-types/common-calc-types");
const class_validator_1 = require("class-validator");
const index_1 = require("../../../util/index");
class CalculatorField {
    constructor(src) {
        this.type = undefined;
        this.name = undefined;
        this.label = undefined;
        if (src) {
            index_1.copyIntoDestination(src, this);
        }
    }
}
__decorate([
    class_validator_1.IsEnum(common_calc_types_1.CalculatorFieldType),
    __metadata("design:type", String)
], CalculatorField.prototype, "type", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CalculatorField.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CalculatorField.prototype, "label", void 0);
exports.CalculatorField = CalculatorField;
class CalculatorMoneyField extends CalculatorField {
    constructor(src) {
        super(undefined); // we don't want the high one copying :P
        this.type = undefined;
        this.minValue = undefined;
        this.maxValue = undefined;
        this.value = undefined;
        this.useSlider = undefined;
        if (src) {
            index_1.copyIntoDestination(src, this);
        }
    }
}
__decorate([
    class_validator_1.Equals(common_calc_types_1.CalculatorFieldType.Money),
    __metadata("design:type", String)
], CalculatorMoneyField.prototype, "type", void 0);
__decorate([
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CalculatorMoneyField.prototype, "minValue", void 0);
__decorate([
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CalculatorMoneyField.prototype, "maxValue", void 0);
__decorate([
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CalculatorMoneyField.prototype, "value", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CalculatorMoneyField.prototype, "useSlider", void 0);
exports.CalculatorMoneyField = CalculatorMoneyField;
class CalculatorPercentageField extends CalculatorField {
    constructor(src) {
        super(undefined);
        this.type = undefined;
        this.minValue = undefined;
        this.maxValue = undefined;
        this.value = undefined;
        this.useSlider = undefined;
        if (src) {
            index_1.copyIntoDestination(src, this);
        }
    }
}
__decorate([
    class_validator_1.Equals(common_calc_types_1.CalculatorFieldType.Percentage),
    __metadata("design:type", String)
], CalculatorPercentageField.prototype, "type", void 0);
__decorate([
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CalculatorPercentageField.prototype, "minValue", void 0);
__decorate([
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CalculatorPercentageField.prototype, "maxValue", void 0);
__decorate([
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CalculatorPercentageField.prototype, "value", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CalculatorPercentageField.prototype, "useSlider", void 0);
exports.CalculatorPercentageField = CalculatorPercentageField;
class CalculatorTermField extends CalculatorField {
    constructor(src) {
        super(undefined);
        this.type = undefined;
        this.valueUnits = undefined;
        this.minValue = undefined;
        this.maxValue = undefined;
        this.value = undefined;
        this.allowCustom = undefined;
        this.terms = undefined;
        if (src) {
            index_1.copyIntoDestination(src, this);
        }
    }
}
__decorate([
    class_validator_1.Equals(common_calc_types_1.CalculatorFieldType.Term),
    __metadata("design:type", String)
], CalculatorTermField.prototype, "type", void 0);
__decorate([
    class_validator_1.Equals(common_calc_types_1.TermUnits.Month),
    __metadata("design:type", String)
], CalculatorTermField.prototype, "valueUnits", void 0);
__decorate([
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CalculatorTermField.prototype, "minValue", void 0);
__decorate([
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CalculatorTermField.prototype, "maxValue", void 0);
__decorate([
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CalculatorTermField.prototype, "value", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CalculatorTermField.prototype, "allowCustom", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], CalculatorTermField.prototype, "terms", void 0);
exports.CalculatorTermField = CalculatorTermField;
class CalculatorColor {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CalculatorColor.prototype, "property", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CalculatorColor.prototype, "color", void 0);
exports.CalculatorColor = CalculatorColor;
class FullCalculatorResponse {
    constructor(src) {
        this.uuid = undefined;
        this.shortid = undefined;
        this.name = undefined;
        this.branding_img = undefined;
        this.fields = undefined;
        this.colors = undefined;
        this.calc_type = undefined;
        this.created_at = undefined;
        this.updated_at = undefined;
        this.org_uuid = undefined;
        this.mailchimp_list = undefined;
        if (src)
            index_1.copyIntoDestination(src, this);
    }
}
exports.FullCalculatorResponse = FullCalculatorResponse;
class CalculatorUpdateInput {
    constructor(src, uuid) {
        this.calc_type = undefined;
        this.name = undefined;
        this.branding_img = undefined;
        this.fields = undefined;
        this.colors = undefined;
        this.uuid = undefined;
        this.mailchimp_list = undefined;
        if (src)
            index_1.copyIntoDestination(src, this);
        this.uuid = uuid;
        if (typeof this.mailchimp_list !== "string") {
            this.mailchimp_list = "";
        }
    }
}
__decorate([
    class_validator_1.IsEnum(common_calc_types_1.CalculatorType),
    __metadata("design:type", String)
], CalculatorUpdateInput.prototype, "calc_type", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CalculatorUpdateInput.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", Object)
], CalculatorUpdateInput.prototype, "branding_img", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    __metadata("design:type", Array)
], CalculatorUpdateInput.prototype, "fields", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    __metadata("design:type", Array)
], CalculatorUpdateInput.prototype, "colors", void 0);
__decorate([
    class_validator_1.IsUUID(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CalculatorUpdateInput.prototype, "uuid", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CalculatorUpdateInput.prototype, "mailchimp_list", void 0);
exports.CalculatorUpdateInput = CalculatorUpdateInput;
class CalculatorCreateInput {
    constructor(src, orgUUID, shortId) {
        this.calc_type = undefined;
        this.name = undefined;
        this.branding_img = undefined;
        this.fields = undefined;
        this.colors = undefined;
        this.mailchimp_list = undefined;
        if (src)
            index_1.copyIntoDestination(src, this);
        this.org_uuid = orgUUID;
        this.shortid = shortId;
        if (typeof this.mailchimp_list !== "string") {
            this.mailchimp_list = "";
        }
    }
}
__decorate([
    class_validator_1.IsEnum(common_calc_types_1.CalculatorType),
    __metadata("design:type", String)
], CalculatorCreateInput.prototype, "calc_type", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CalculatorCreateInput.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", Object)
], CalculatorCreateInput.prototype, "branding_img", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    __metadata("design:type", Array)
], CalculatorCreateInput.prototype, "fields", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ValidateNested({ each: true }),
    __metadata("design:type", Array)
], CalculatorCreateInput.prototype, "colors", void 0);
__decorate([
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], CalculatorCreateInput.prototype, "org_uuid", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CalculatorCreateInput.prototype, "shortid", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CalculatorCreateInput.prototype, "mailchimp_list", void 0);
exports.CalculatorCreateInput = CalculatorCreateInput;
class CalculatorGetRequest {
    constructor(src, uuid) {
        this.fields = undefined;
        this.uuid = undefined;
        if (src)
            index_1.copyIntoDestination(src, this);
        this.uuid = uuid;
    }
}
__decorate([
    class_validator_1.ValidateIf((o, v) => v !== undefined),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CalculatorGetRequest.prototype, "fields", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], CalculatorGetRequest.prototype, "uuid", void 0);
exports.CalculatorGetRequest = CalculatorGetRequest;
class CalculatorDeleteRequest {
    constructor(uuid) {
        this.uuid = undefined;
        this.uuid = uuid;
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsUUID(),
    __metadata("design:type", String)
], CalculatorDeleteRequest.prototype, "uuid", void 0);
exports.CalculatorDeleteRequest = CalculatorDeleteRequest;
class CalculatorSchema {
    constructor({ type, typeName, fields, colors }) {
        this.name = "";
        this.branding_img = "";
        this.name = typeName;
        this.calculatorTypeName = typeName;
        this.calc_type = type;
        this.fields = fields;
        this.colors = colors;
    }
}
exports.CalculatorSchema = CalculatorSchema;
exports.calculatorSchemas = {};
exports.calculatorSchemas[common_calc_types_1.CalculatorType.AutoLoan] = new CalculatorSchema({
    type: common_calc_types_1.CalculatorType.AutoLoan,
    typeName: "Auto Loan Calculator",
    fields: [
        new CalculatorMoneyField({
            type: common_calc_types_1.CalculatorFieldType.Money,
            name: "Loan Amount",
            label: "Car Loan Amount",
            value: 20000,
            minValue: 5000,
            maxValue: 100000,
            useSlider: true,
        }),
        new CalculatorMoneyField({
            type: common_calc_types_1.CalculatorFieldType.Money,
            name: "Down Payment",
            label: "Down Payment",
            value: 3000,
            minValue: 0,
            maxValue: 0,
            useSlider: true,
        }),
        new CalculatorTermField({
            type: common_calc_types_1.CalculatorFieldType.Term,
            name: "Term Length",
            label: "Term Length",
            value: 15,
            minValue: 0,
            maxValue: 0,
            valueUnits: common_calc_types_1.TermUnits.Month,
            allowCustom: false,
            terms: []
        }),
        new CalculatorPercentageField({
            type: common_calc_types_1.CalculatorFieldType.Percentage,
            name: "Interest Rate",
            label: "Interest Rate",
            value: 2.3,
            minValue: 0.0,
            maxValue: 100.0,
            useSlider: true
        })
    ],
    colors: [
        { color: "white", property: "bgColor", displayName: "Background Color", },
        { color: "black", property: "textColor", displayName: "Text Color", },
        { color: "#5c7cfa", property: "primaryColor", displayName: "Primary Color" },
    ],
});
exports.calculatorSchemas[common_calc_types_1.CalculatorType.Mortgage] = new CalculatorSchema({
    type: common_calc_types_1.CalculatorType.Mortgage,
    typeName: "Mortgage Calculator",
    fields: [
        new CalculatorMoneyField({
            type: common_calc_types_1.CalculatorFieldType.Money,
            name: "Loan Amount",
            label: "Mortgage Loan Amount",
            value: 250000,
            minValue: 50000,
            maxValue: 2000000,
            useSlider: true,
        }),
        new CalculatorMoneyField({
            type: common_calc_types_1.CalculatorFieldType.Money,
            name: "Down Payment",
            label: "Down Payment",
            value: 25000,
            minValue: 0,
            maxValue: 0,
            useSlider: true,
        }),
        new CalculatorTermField({
            type: common_calc_types_1.CalculatorFieldType.Term,
            name: "Term Length",
            label: "Term Length",
            value: 15,
            minValue: 0,
            maxValue: 0,
            valueUnits: common_calc_types_1.TermUnits.Month,
            allowCustom: false,
            terms: []
        }),
        new CalculatorPercentageField({
            type: common_calc_types_1.CalculatorFieldType.Percentage,
            name: "Interest Rate",
            label: "Interest Rate",
            value: 3.0,
            minValue: 0.0,
            maxValue: 100.0,
            useSlider: true
        })
    ],
    colors: [
        { color: "white", property: "bgColor", displayName: "Background Color", },
        { color: "black", property: "textColor", displayName: "Text Color", },
        { color: "#5c7cfa", property: "primaryColor", displayName: "Primary Color" },
    ],
});
exports.calculatorSchemas[common_calc_types_1.CalculatorType.BoatRVLoan] = new CalculatorSchema({
    type: common_calc_types_1.CalculatorType.BoatRVLoan,
    typeName: "Boat/RV Loan Calculator",
    fields: [
        new CalculatorMoneyField({
            type: common_calc_types_1.CalculatorFieldType.Money,
            name: "Loan Amount",
            label: "Boat/RV Loan Amount",
            value: 20000,
            minValue: 5000,
            maxValue: 100000,
            useSlider: true,
        }),
        new CalculatorMoneyField({
            type: common_calc_types_1.CalculatorFieldType.Money,
            name: "Down Payment",
            label: "Down Payment",
            value: 3000,
            minValue: 0,
            maxValue: 0,
            useSlider: true,
        }),
        new CalculatorTermField({
            type: common_calc_types_1.CalculatorFieldType.Term,
            name: "Term Length",
            label: "Term Length",
            value: 15,
            minValue: 0,
            maxValue: 0,
            valueUnits: common_calc_types_1.TermUnits.Month,
            allowCustom: false,
            terms: []
        }),
        new CalculatorPercentageField({
            type: common_calc_types_1.CalculatorFieldType.Percentage,
            name: "Interest Rate",
            label: "Interest Rate",
            value: 2.3,
            minValue: 0.0,
            maxValue: 100.0,
            useSlider: true
        })
    ],
    colors: [
        { color: "white", property: "bgColor", displayName: "Background Color", },
        { color: "black", property: "textColor", displayName: "Text Color", },
        { color: "#5c7cfa", property: "primaryColor", displayName: "Primary Color" },
    ],
});
exports.calculatorSchemas[common_calc_types_1.CalculatorType.PersonalLoan] = new CalculatorSchema({
    type: common_calc_types_1.CalculatorType.PersonalLoan,
    typeName: "Personal Loan Calculator",
    fields: [
        new CalculatorMoneyField({
            type: common_calc_types_1.CalculatorFieldType.Money,
            name: "Loan Amount",
            label: "Personal Loan Amount",
            value: 20000,
            minValue: 5000,
            maxValue: 100000,
            useSlider: true,
        }),
        new CalculatorTermField({
            type: common_calc_types_1.CalculatorFieldType.Term,
            name: "Term Length",
            label: "Term Length",
            value: 15,
            minValue: 0,
            maxValue: 0,
            valueUnits: common_calc_types_1.TermUnits.Month,
            allowCustom: false,
            terms: []
        }),
        new CalculatorPercentageField({
            type: common_calc_types_1.CalculatorFieldType.Percentage,
            name: "Interest Rate",
            label: "Interest Rate",
            value: 2.3,
            minValue: 0.0,
            maxValue: 100.0,
            useSlider: true
        })
    ],
    colors: [
        { color: "white", property: "bgColor", displayName: "Background Color", },
        { color: "black", property: "textColor", displayName: "Text Color", },
        { color: "#5c7cfa", property: "primaryColor", displayName: "Primary Color" },
    ],
});
exports.calculatorSchemas[common_calc_types_1.CalculatorType.CDLoan] = new CalculatorSchema({
    type: common_calc_types_1.CalculatorType.CDLoan,
    typeName: "CD Loan Calculator",
    fields: [],
    colors: [
        { color: "white", property: "bgColor", displayName: "Background Color", },
        { color: "black", property: "textColor", displayName: "Text Color", },
        { color: "#5c7cfa", property: "primaryColor", displayName: "Primary Color" },
    ],
});
exports.calculatorSchemas[common_calc_types_1.CalculatorType.HomeEquityLoan] = new CalculatorSchema({
    type: common_calc_types_1.CalculatorType.HomeEquityLoan,
    typeName: "Home Equity Loan Calculator",
    fields: [],
    colors: [
        { color: "white", property: "bgColor", displayName: "Background Color", },
        { color: "black", property: "textColor", displayName: "Text Color", },
        { color: "#5c7cfa", property: "primaryColor", displayName: "Primary Color" },
    ],
});
exports.calculatorSchemas[common_calc_types_1.CalculatorType.MoneyMarketLoan] = new CalculatorSchema({
    type: common_calc_types_1.CalculatorType.MoneyMarketLoan,
    typeName: "Money Market Loan Calculator",
    fields: [],
    colors: [
        { color: "white", property: "bgColor", displayName: "Background Color", },
        { color: "black", property: "textColor", displayName: "Text Color", },
        { color: "#5c7cfa", property: "primaryColor", displayName: "Primary Color" },
    ],
});
