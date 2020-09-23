"use strict";var _this=this,__awaiter=this&&this.__awaiter||function(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(a){f(a)}}function h(a){try{i(d["throw"](a))}catch(a){f(a)}}function i(a){a.done?e(a.value):new c(function(b){b(a.value)}).then(g,h)}i((d=d.apply(a,b||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0}),exports.schema=`
type User {
    uuid: UUID!
    email: String!
    created: Date!
    modified: Date!

    profile: Profile!
    client: Client!
}

extend type Query {
    me: User
}
`,exports.resolvers={User:{profile:(a,b,{Profiles:c})=>__awaiter(_this,void 0,void 0,function*(){const b=yield c.getByUserId(a.uuid);return b}),client:(a,b,{Clients:c})=>{return c.getById(a.client_uuid)}},Query:{me:(a,{id:b},{Users:c,userId:d})=>{return c.getById(d)}}};