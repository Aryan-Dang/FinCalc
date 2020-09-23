"use strict";var __awaiter=this&&this.__awaiter||function(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(a){f(a)}}function h(a){try{i(d["throw"](a))}catch(a){f(a)}}function i(a){a.done?e(a.value):new c(function(b){b(a.value)}).then(g,h)}i((d=d.apply(a,b||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const util_1=require("../util"),serve_1=require("../../serve"),DataLoader=require("dataloader");class Profiles{constructor(){this.profileByIdLoader=new DataLoader((a)=>__awaiter(this,void 0,void 0,function*(){const b=`
            SELECT * FROM profiles
            WHERE uuid IN (${util_1.multipleParamString(a)});
        `,c=yield serve_1.db.any(b,a);return a.map((a)=>c.find((b)=>b.uuid===a))})),this.profileByUserIdLoader=new DataLoader((a)=>__awaiter(this,void 0,void 0,function*(){const b=`
            SELECT * FROM profiles
            WHERE user_uuid IN (${util_1.multipleParamString(a)});
        `,c=yield serve_1.db.any(b,a);return a.map((a)=>c.find((b)=>b.user_uuid===a))}))}updateByUserId(a,b){return __awaiter(this,void 0,void 0,function*(){let c=`UPDATE profiles SET `;const d=[a];if("string"==typeof b.first_name&&(d.push(b.first_name),c+="first_name = $"+d.length),"string"==typeof b.last_name&&(d.push(b.last_name),c+=(1<d.length?", ":"")+"last_name = $"+d.length),"string"==typeof b.profile_img&&(d.push(b.profile_img),c+=(1<d.length?", ":"")+"profile_img = $"+d.length),2>d.length)return!1;c+=" WHERE user_uuid = $1",c+=" RETURNING uuid;";debugger;const e=yield serve_1.db.manyOrNone(c,d),f=yield serve_1.db.oneOrNone(c,d),g=f&&f.uuid;return!!g&&(this.profileByIdLoader.clear(g),this.profileByUserIdLoader.clear(a),!0)})}initUserProfile(a,b,c){const d=`
            UPDATE profiles
            SET first_name = $1, last_name = $2
            WHERE user_uuid = $3
            RETURNING uuid;
        `;return serve_1.db.one(d,[b,c,a])}getByUserId(a){return this.profileByUserIdLoader.load(a)}getById(a){return this.profileByIdLoader.load(a)}}exports.Profiles=Profiles;