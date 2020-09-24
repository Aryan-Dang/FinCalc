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
const api_1 = require("./api");
const lead_1 = require("./api-models/lead");
const class_validator_1 = require("class-validator");
const leads_1 = require("../../models/leads");
const calculator_1 = require("../../models/calculator");
const util_1 = require("../../models/util");
const events_1 = require("../../models/events");
const metrics_1 = require("../../util/metrics");
const common_1 = require("./api-models/common");
const app_1 = require("../../util/app");
const util_2 = require("../../util");
const file_uploads_1 = require("../util/file-uploads");
const FileSystem = require("fs");
const tempfile_1 = require("../../models/tempfile");
const time_1 = require("../../util/time");
function listLeads(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached calculator/list endpoint without authorization.");
        let calcUUID = null;
        if (request.query && typeof request.query["calc"] === "string") {
            calcUUID = request.query["calc"];
        }
        const listInput = new common_1.ModelListRequest(request.query);
        const fields = listInput.fields ? listInput.fields.split(",").filter(leads_1.isLeadColumn) : [];
        const orderBy = leads_1.isLeadColumn(listInput.order_by) ? listInput.order_by : "created_at";
        const orderDir = util_1.DBOrdering.isDir(listInput.order_dir) ? listInput.order_dir : util_1.DBOrdering.DESC;
        const order = util_1.DBOrdering.single(orderBy, orderDir);
        const offset = listInput.offset;
        const count = util_2.clamp(listInput.count, 10, 100);
        // #FIXME: I call count every time, I really should just be caching it :P
        //         or maybe I just don't show the count :\
        let leads;
        let leadsCount;
        if (calcUUID) {
            leads = yield leads_1.LeadRepo.getAllByOrgCalcUUID(userAuth.orgUUID, calcUUID, offset, count, fields, order);
            leadsCount = yield leads_1.LeadRepo.countAllByOrgCalcUUID(userAuth.orgUUID, calcUUID);
        }
        else {
            leads = yield leads_1.LeadRepo.getAllByOrgUUID(userAuth.orgUUID, offset, count, fields, order);
            leadsCount = yield leads_1.LeadRepo.countAllByOrgUUID(userAuth.orgUUID);
        }
        const response = { leads, count: leadsCount };
        return api_1.default.success(context, response);
    });
}
exports.listLeads = listLeads;
function listLeadsInRange(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached calculator/list endpoint without authorization.");
        let calcUUID = null;
        if (request.query && typeof request.query["calc"] === "string") {
            calcUUID = request.query["calc"];
        }
        const listInput = new common_1.ModelRangedListRequest(request.query);
        const fields = listInput.fields ? listInput.fields.split(",").filter(leads_1.isLeadColumn) : [];
        const orderBy = leads_1.isLeadColumn(listInput.order_by) ? listInput.order_by : "created_at";
        const orderDir = util_1.DBOrdering.isDir(listInput.order_dir) ? listInput.order_dir : util_1.DBOrdering.DESC;
        const order = util_1.DBOrdering.single(orderBy, orderDir);
        const offset = listInput.offset;
        const count = util_2.clamp(listInput.count, 10, 100);
        const from = new Date(listInput.from);
        const to = new Date(listInput.to);
        if (!Number.isFinite(from.getTime())) {
            return api_1.default.error(context, "from must be a valie date.");
        }
        if (!Number.isFinite(to.getTime())) {
            return api_1.default.error(context, "to must be a valid date.");
        }
        let leads;
        let leadsCount;
        if (calcUUID) {
            // leads = await LeadRepo.getAllByOrgCalcUUID(userAuth.orgUUID, calcUUID, offset, count, fields, order);
            // leadsCount = await LeadRepo.countAllByOrgCalcUUID(userAuth.orgUUID, calcUUID);
            return api_1.default.error(context, "Ranged leads for calculators it not yet supported.");
        }
        else {
            leads = yield leads_1.LeadRepo.getAllByOrgUUIDInRange(userAuth.orgUUID, from, to, offset, count, fields, order);
            leadsCount = yield leads_1.LeadRepo.countAllByOrgUUIDInRange(userAuth.orgUUID, from, to);
        }
        const response = { leads, count: leadsCount };
        return api_1.default.success(context, response);
    });
}
exports.listLeadsInRange = listLeadsInRange;
function createCSV(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        const userAuth = app_1.App.assertExists(context.currentAuth, "Reached calculator/list endpoint without authorization.");
        let calcUUID = null;
        if (request.query && typeof request.query["calc"] === "string") {
            calcUUID = request.query["calc"];
        }
        const listInput = new common_1.ModelRangedListRequest(request.query);
        // const fields = listInput.fields ? listInput.fields.split(",").filter(isLeadColumn) : [];
        const orderBy = leads_1.isLeadColumn(listInput.order_by) ? listInput.order_by : "created_at";
        const orderDir = util_1.DBOrdering.isDir(listInput.order_dir) ? listInput.order_dir : util_1.DBOrdering.DESC;
        const order = util_1.DBOrdering.single(orderBy, orderDir);
        // const offset = listInput.offset;
        // const count = clamp(listInput.count, 10, 100);
        const offset = 0;
        const count = 10000;
        const from = new Date(listInput.from);
        const to = new Date(listInput.to);
        let leads;
        let leadsCount;
        if (calcUUID) {
            // leads = await LeadRepo.getAllByOrgCalcUUID(userAuth.orgUUID, calcUUID, offset, count, fields, order);
            // leadsCount = await LeadRepo.countAllByOrgCalcUUID(userAuth.orgUUID, calcUUID);
            return api_1.default.error(context, "Ranged leads for calculators it not yet supported.");
        }
        else {
            leads = yield leads_1.LeadRepo.getAllByOrgUUIDInRange(userAuth.orgUUID, from, to, offset, count, [
                "name", "phone_number", "email", "amount", "term", "created_at"
            ], order);
            leadsCount = yield leads_1.LeadRepo.countAllByOrgUUIDInRange(userAuth.orgUUID, from, to);
        }
        const csvFile = (yield file_uploads_1.randomUploadPath("public")) + ".csv";
        const writeStream = FileSystem.createWriteStream(csvFile);
        yield writeStream.write("Name, Phone Number, Email, Amount, Term (Months), Generated On\n");
        for (const lead of leads) {
            const data = [
                lead.name,
                lead.phone_number,
                lead.email,
                lead.amount,
                lead.term,
                // #FIXME: This is for demo purposes only (need to be quick)
                lead.created_at.toString().replace(", ", " ").replace(",", "")
            ];
            yield writeStream.write(data.join(",") + "\n");
        }
        yield writeStream.end();
        yield tempfile_1.TempFileRepo.createTempFile(csvFile, time_1.Duration.hours(12));
        const _path = csvFile.startsWith("/") ? csvFile : "/" + csvFile;
        return api_1.default.success(context, { path: _path });
    });
}
exports.createCSV = createCSV;
function generateLead(context, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { request } = context;
        const lead = new lead_1.CalculatorLead(request.body);
        // validation:
        const validationErrors = class_validator_1.validateSync(lead);
        if (validationErrors && validationErrors.length) {
            return api_1.default.verrors(context, validationErrors);
        }
        if (!!request.body["preview"]) {
            // The calculator is in preview mode so at this point it's all good.
            return api_1.default.success(context, true);
        }
        // check calculator:
        const calculator = yield calculator_1.CalcRepo.getByShortId(lead.shortid, ["uuid", "org_uuid"]);
        if (!calculator) {
            return api_1.default.error(context, "Calculator does not exist.");
        }
        // insert lead:
        yield leads_1.LeadRepo.insert({
            email: lead.email,
            name: lead.name,
            phone_number: lead.phone_number,
            calc_uuid: calculator.uuid,
            amount: lead.amount,
            term: lead.term
        });
        const calcUUID = calculator.uuid;
        const orgUUID = calculator.org_uuid;
        yield events_1.EventRepo.insert({
            event_type: "conversion",
            visitor_uuid: context.currentVisitorId,
            session_uuid: context.currentSessionId,
            calc_uuid: calcUUID,
            org_uuid: orgUUID,
            metadata: {
                ip_addr: metrics_1.getIPAddress(context),
                user_agent: context.get("User-Agent"),
            }
        });
        return api_1.default.success(context, true);
    });
}
exports.generateLead = generateLead;
