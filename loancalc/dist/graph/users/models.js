"use strict";var __awaiter=this&&this.__awaiter||function(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(a){f(a)}}function h(a){try{i(d["throw"](a))}catch(a){f(a)}}function i(a){a.done?e(a.value):new c(function(b){b(a.value)}).then(g,h)}i((d=d.apply(a,b||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const util_1=require("../util"),serve_1=require("../../serve"),DataLoader=require("dataloader"),util_2=require("../../util/util");exports.UserRoles={USER:"user",ADMIN:"admin",SUPER:"super"};class Users{constructor(){this.userByIdLoader=new DataLoader((a)=>__awaiter(this,void 0,void 0,function*(){const b=`
            SELECT * FROM users
            WHERE uuid IN (${util_1.multipleParamString(a)});
        `,c=yield serve_1.db.any(b,a);return a.map((a)=>c.find((b)=>b.uuid===a))})),this.userByEmailLoader=new DataLoader((a)=>__awaiter(this,void 0,void 0,function*(){const b=`
            SELECT * FROM users
            WHERE lower(email) IN (${util_1.multipleParamString(a,(a)=>`lower(${a})`)});
        `,c=yield serve_1.db.manyOrNone(b,a);return a.map((a)=>c.find((b)=>util_2.equalsIgnoreCase(a,b.email)))}))}getClientUUIDById(a){return serve_1.db.one(`
            SELECT client_uuid FROM users u
            WHERE u.uuid = $1;
        `,a)}getById(a){return this.userByIdLoader.load(a)}getByEmail(a){return this.userByEmailLoader.load(a)}createUser(a,b,c,d){return serve_1.db.one(`
            INSERT INTO users(email, password, role, client_uuid) 
            VALUES ($1, $2, $3, $4)
            RETURNING uuid;
        `,[b,c,d,a])}}exports.Users=Users;