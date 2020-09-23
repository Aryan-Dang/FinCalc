"use strict";var __awaiter=this&&this.__awaiter||function(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(a){f(a)}}function h(a){try{i(d["throw"](a))}catch(a){f(a)}}function i(a){a.done?e(a.value):new c(function(b){b(a.value)}).then(g,h)}i((d=d.apply(a,b||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const util_1=require("../util"),serve_1=require("../../serve"),Url=require("url"),Path=require("path"),db_files_1=require("../../util/db-files");exports.schema=`
input ProfileInput {
    firstName: String
    lastName: String
    imageURL: String
}

type Profile {
    uuid: UUID!
    user: User!
    firstName: String
    lastName: String
    imageURL: String
    created: Date!
    modified: Date!
    hidden: Date
}

extend type Mutation {
    updateProfile(profileInput: ProfileInput!): Boolean
}
`,exports.resolvers={Profile:{firstName:util_1.property("first_name"),lastName:util_1.property("last_name"),imageURL:(a,b,{context:c})=>{let d;if("production"===process.env.NODE_ENV){const a=c.request.get("Origin");d=a&&0<a.length?a:"https://fincalc.co"}else d="http://localhost:8080";return a.profile_img?d+"/ustatic/"+a.profile_img:d+"/static/img/default-profile.png"},user:(a,b,{Users:c})=>{return c.getById(a.user_uuid)}},Mutation:{updateProfile(a,{profileInput:b},{userId:c,Profiles:d}){return __awaiter(this,void 0,void 0,function*(){try{const a={first_name:b.firstName,last_name:b.lastName,profile_img:void 0};if(b.imageURL){const c=Url.parse(b.imageURL);if(c.path){const b=Path.parse(c.path).base,d=yield db_files_1.checkFileTag(b);"profile"===d&&(a.profile_img=b)}}return yield d.updateByUserId(c,a)}catch(a){serve_1.Logger.error("Oh, no! ",a)}})}}};