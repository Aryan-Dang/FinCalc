"use strict";var __awaiter=this&&this.__awaiter||function(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(a){f(a)}}function h(a){try{i(d["throw"](a))}catch(a){f(a)}}function i(a){a.done?e(a.value):new c(function(b){b(a.value)}).then(g,h)}i((d=d.apply(a,b||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const util_1=require("../util"),serve_1=require("../../serve"),DataLoader=require("dataloader");class Clients{constructor(){this.clientByIdLoader=new DataLoader((a)=>__awaiter(this,void 0,void 0,function*(){const b=`
            SELECT * FROM clients
            WHERE uuid IN (${util_1.multipleParamString(a)});
        `,c=yield serve_1.db.any(b,a);return a.map((a)=>c.find((b)=>b.uuid===a))})),this.clientUserIdsListLoader=new DataLoader((a)=>__awaiter(this,void 0,void 0,function*(){const b=`
            SELECT users.uuid, users.client_uuid FROM users
            WHERE users.client_uuid IN (${util_1.multipleParamString(a)});
        `,c=yield serve_1.db.any(b,a);return a.map((a)=>{return c.filter((b)=>b.client_uuid===a).map((a)=>a.uuid)})}))}updateById(a,b){return __awaiter(this,void 0,void 0,function*(){let c=`UPDATE clients SET `;const d=[a];if("string"==typeof b.name&&(d.push(b.name),c+="name = $"+d.length),"string"==typeof b.branding_img&&(d.push(b.branding_img),c+=(1<d.length?", ":"")+"branding_img = $"+d.length),2>d.length)return!1;c+=" WHERE uuid = $1",c+=" RETURNING uuid;";const e=yield serve_1.db.oneOrNone(c,d),f=e&&e.uuid;return!!f&&(this.clientByIdLoader.clear(f),!0)})}getClientForFacebookId(a){return serve_1.db.oneOrNone(`
        SELECT clients.* FROM facebook_clients
        INNER JOIN clients ON clients.uuid = facebook_clients.client_uuid
        WHERE facebook_clients.facebook_id = $1;
        `,a)}getClientIdForFacebookId(a){return serve_1.db.oneOrNone(`
        SELECT clients.uuid FROM facebook_clients
        INNER JOIN clients ON clients.uuid = facebook_clients.client_uuid
        WHERE facebook_clients.facebook_id = $1;
        `,a)}getClientBrandingForFacebookId(a){return serve_1.db.oneOrNone(`
        SELECT clients.uuid, clients.branding_img, clients.name FROM facebook_clients
        INNER JOIN clients ON clients.uuid = facebook_clients.client_uuid
        WHERE facebook_clients.facebook_id = $1;
        `,a)}getFacebookIdsForClient(a){return __awaiter(this,void 0,void 0,function*(){const b=yield serve_1.db.manyOrNone(`
        SELECT facebook_id FROM facebook_clients
        WHERE client_uuid = $1;
        `,a);return b?b.map((a)=>a.facebook_id):[]})}deleteFacebookIdForClient(a,b){return __awaiter(this,void 0,void 0,function*(){const c=yield serve_1.db.result(`
            DELETE FROM facebook_clients WHERE
            client_uuid = $1 AND facebook_id = $2;
        `,[a,b]);return 0<c.rowCount})}setFacebookIdForClient(a,b){return __awaiter(this,void 0,void 0,function*(){const c=yield serve_1.db.result(`
            INSERT INTO facebook_clients(client_uuid, facebook_id)
                VALUES ($1, $2)
                ON CONFLICT (facebook_id) DO UPDATE
                SET client_uuid = $1;
        `,[a,b]);return 0<c.rowCount})}setMailChimpAccessTokenForClient(a,b){return __awaiter(this,void 0,void 0,function*(){const c=yield serve_1.db.result(`
            INSERT INTO mailchimp_clients(client_uuid, access_token)
            VALUES ($1, $2)
            ON CONFLICT (client_uuid) DO UPDATE
            SET access_token = $2;
        `,[a,b]);return 0<c.rowCount})}deleteMailChimpAccessTokenForClient(a){return __awaiter(this,void 0,void 0,function*(){const b=yield serve_1.db.result(`
            DELETE FROM mailchimp_clients WHERE client_uuid = $1;
        `,a);return 0<b.rowCount})}getMailChimpAccessTokenForClient(a){return __awaiter(this,void 0,void 0,function*(){const b=yield serve_1.db.oneOrNone(`
            SELECT access_token FROM mailchimp_clients
            WHERE client_uuid = $1;
        `,a);return b?b.access_token:null})}createTempId(a){return __awaiter(this,void 0,void 0,function*(){return yield serve_1.db.one(`
            INSERT INTO temp_client_uuids(real_client_uuid)
            VALUES ($1)
            RETURNING temp_client_uuid as uuid
        `,[a])})}getClientIdFromTemp(a,b){return __awaiter(this,void 0,void 0,function*(){return b?yield serve_1.db.oneOrNone(`
                UPDATE temp_client_uuids
                SET used = TRUE
                WHERE temp_client_uuid = $1 AND used = FALSE
                RETURNING real_client_uuid AS uuid;
            `,a):yield serve_1.db.oneOrNone(`
                SELECT real_client_uuid AS uuid
                FROM temp_client_uuids
                WHERE temp_client_uuid = $1 AND used = FALSE;
            `,a)})}getClientForUUID(a,b){return __awaiter(this,void 0,void 0,function*(){const c=yield this.getClientIdFromTemp(a,b);return c?yield this.getById(c.uuid):null})}createClient(a){return serve_1.db.one(`
            INSERT INTO clients(name) VALUES ($1) RETURNING uuid;
        `,[a])}getUsersForClientById(a){return this.clientUserIdsListLoader.load(a)}getById(a){return this.clientByIdLoader.load(a)}}exports.Clients=Clients;