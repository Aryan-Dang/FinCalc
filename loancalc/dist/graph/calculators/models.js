"use strict";var __awaiter=this&&this.__awaiter||function(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(a){f(a)}}function h(a){try{i(d["throw"](a))}catch(a){f(a)}}function i(a){a.done?e(a.value):new c(function(b){b(a.value)}).then(g,h)}i((d=d.apply(a,b||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const util_1=require("../util"),serve_1=require("../../serve"),DataLoader=require("dataloader"),shortid=require("shortid");class Calculators{constructor(){this.calcByIdLoader=new DataLoader((a)=>__awaiter(this,void 0,void 0,function*(){const b=`
            SELECT * FROM calculators
            WHERE uuid IN (${util_1.multipleParamString(a)})
            AND hidden IS NULL;
        `,c=yield serve_1.db.any(b,a);return a.map((a)=>c.find((b)=>b.uuid===a))})),this.calcByShortIdLoader=new DataLoader((a)=>__awaiter(this,void 0,void 0,function*(){const b=`
            SELECT * FROM calculators
            WHERE shortid IN (${util_1.multipleParamString(a)})
            AND hidden IS NULL;
        `,c=yield serve_1.db.any(b,a);return a.map((a)=>c.find((b)=>b.shortid===a))}))}deleteCalculatorByUUID(a){return __awaiter(this,void 0,void 0,function*(){const b=`
            UPDATE calculators
            SET hidden = now()
            WHERE uuid = $1 AND hidden IS NULL
            RETURNING shortid;
        `,c=yield serve_1.db.oneOrNone(b,[a]);return c&&c.shortid&&(this.calcByIdLoader.clear(a),this.calcByShortIdLoader.clear(c.shortid),!0)})}createCalculator(a,b,c,d){return __awaiter(this,void 0,void 0,function*(){let e=shortid.generate(),f=yield serve_1.db.one(`
            INSERT INTO calculators(name, shortid, calc_type, metadata, client_uuid)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING uuid;
        `,[a,e,b,JSON.stringify(c),d]);return{uuid:f.uuid,shortid:e}})}updateCalculatorByShortId(a,b,c,d){return this.calcByShortIdLoader.clear(a),serve_1.db.none(`
            UPDATE calculators
            SET name = $1, calc_type = $2, metadata = $3
            WHERE shortid = $4;
        `,[b,c,JSON.stringify(d),a])}updateCalculatorByUUID(a,b,c,d){return this.calcByIdLoader.clear(a),serve_1.db.none(`
            UPDATE calculators
            SET name = $1, calc_type = $2, metadata = $3
            WHERE uuid = $4;
        `,[b,c,JSON.stringify(d),a])}listCalculators(a,b,c){return __awaiter(this,void 0,void 0,function*(){const d=`
            SELECT name, uuid, calc_type, shortid, created, modified
            FROM calculators
            WHERE hidden IS NULL AND client_uuid = $1
            ORDER BY created DESC
            LIMIT $3 OFFSET $2;
        `;return yield serve_1.db.any(d,[a,b,c])})}getCalculatorClientIdByShortId(a){return serve_1.db.one(`
            SELECT client_uuid FROM calculators
            WHERE shortid = $1;
        `,[a])}getCalculatorClientIdByUUID(a){return serve_1.db.one(`
            SELECT client_uuid FROM calculators
            WHERE uuid = $1;
        `,[a])}getByShortIdWithBranding(a){return __awaiter(this,void 0,void 0,function*(){return yield serve_1.db.oneOrNone(`
            SELECT calc.*, cli.branding_img FROM calculators calc
            INNER JOIN clients cli ON cli.uuid = calc.client_uuid
            WHERE calc.shortid = $1;
        `,[a])})}getByShortId(a){return this.calcByShortIdLoader.load(a)}getById(a){return this.calcByIdLoader.load(a)}}exports.Calculators=Calculators;