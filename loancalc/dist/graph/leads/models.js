"use strict";var __awaiter=this&&this.__awaiter||function(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(a){f(a)}}function h(a){try{i(d["throw"](a))}catch(a){f(a)}}function i(a){a.done?e(a.value):new c(function(b){b(a.value)}).then(g,h)}i((d=d.apply(a,b||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const util_1=require("../util"),serve_1=require("../../serve"),DataLoader=require("dataloader");class Leads{constructor(){this.leadByIdLoader=new DataLoader((a)=>__awaiter(this,void 0,void 0,function*(){const b=`
            SELECT * FROM leads
            WHERE uuid IN (${util_1.multipleParamString(a)});
        `,c=yield serve_1.db.any(b,a);return a.map((a)=>c.find((b)=>b.uuid===a))}))}getById(a){return this.leadByIdLoader.load(a)}countLeadsForClient(a){return __awaiter(this,void 0,void 0,function*(){return(yield serve_1.db.one(`SELECT count(*) FROM leads WHERE client_uuid = $1;`,a)).count})}getLeadsForClient(a,b,c){return serve_1.db.manyOrNone(`
            SELECT * FROM leads
            WHERE client_uuid  = $1
            ORDER BY created DESC
            OFFSET $2 LIMIT $3;
        `,[a,b,c])}getLeadsForClientInRange(a,b,c,d,e){return serve_1.db.manyOrNone(`
        SELECT * FROM leads
        WHERE
            client_uuid  = $1 AND
            created >= $4::timestamptz AND created <= $5::timestamptz
        ORDER BY created DESC
        OFFSET $2 LIMIT $3;
        `,[a,b,c,d,e])}countLeadsForClientInRange(a,b,c){return __awaiter(this,void 0,void 0,function*(){return(yield serve_1.db.one(`
        SELECT count(*) FROM leads
        WHERE
            client_uuid  = $1 AND
            created >= $2::timestamptz AND created <= $3::timestamptz;
        `,[a,b,c])).count})}countLeadsForCalculator(a){return __awaiter(this,void 0,void 0,function*(){return(yield serve_1.db.one(`SELECT count(*) FROM leads WHERE calculator_uuid = $1;`,a)).count})}getLeadsForCalculator(a,b,c){return serve_1.db.manyOrNone(`
            SELECT * FROM leads
            WHERE calculator_uuid  = $1
            ORDER BY created DESC
            OFFSET $2 LIMIT $3;
        `,[a,b,c])}getLeadsForCalculatorInRange(a,b,c,d,e){return serve_1.db.manyOrNone(`
        SELECT * FROM leads
        WHERE
            calculator_uuid  = $1 AND
            created >= $4::timestamptz AND created <= $5::timestamptz
        ORDER BY created DESC
        OFFSET $2 LIMIT $3;
        `,[a,b,c,d,e])}countLeadsForCalculatorInRange(a,b,c){return __awaiter(this,void 0,void 0,function*(){return(yield serve_1.db.one(`
        SELECT count(*) FROM leads
        WHERE
            calculator_uuid  = $1 AND
            created >= $2::timestamptz AND created <= $3::timestamptz;
        `,[a,b,c])).count})}createLead(a){const b=`
        INSERT INTO leads (visitor_uuid, session_uuid, first_name, last_name, email_address, phone_number, metadata, calculator_uuid, client_uuid)
        VALUES($<visitor_uuid>, $<session_uuid>, $<first_name>, $<last_name>, $<email_address>, $<phone_number>, $<metadata>, $<calculator_uuid>, $<client_uuid>)
        RETURNING uuid;
        `,c=Object.assign({},a);return c.metadata=JSON.stringify(c.metadata),serve_1.db.one(b,c)}createLeadAt(a,b){const c=`
        INSERT INTO leads (visitor_uuid, session_uuid, first_name, last_name, email_address, phone_number, metadata, calculator_uuid, client_uuid, created)
        VALUES($<visitor_uuid>, $<session_uuid>, $<first_name>, $<last_name>, $<email_address>, $<phone_number>, $<metadata>, $<calculator_uuid>, $<client_uuid>, $<created>)
        RETURNING uuid;
        `,d=Object.assign({},a);return d.metadata=JSON.stringify(d.metadata),d.created=b.format(),serve_1.db.one(c,d)}}exports.Leads=Leads;