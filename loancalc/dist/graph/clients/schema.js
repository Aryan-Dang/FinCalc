"use strict";var _this=this,__awaiter=this&&this.__awaiter||function(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(a){f(a)}}function h(a){try{i(d["throw"](a))}catch(a){f(a)}}function i(a){a.done?e(a.value):new c(function(b){b(a.value)}).then(g,h)}i((d=d.apply(a,b||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const util_1=require("../util"),moment=require("moment"),Url=require("url"),Path=require("path"),db_files_1=require("../../util/db-files"),mail_chimp_1=require("../../util/mail-chimp");exports.schema=`
input ClientInput {
    name: String
    brandingImageURL: String
}

type ClientFacebookInfo {
    ids: [String]
    connected: Boolean!
}

type MailChimpList {
    id: String!
    webId: Int!
    name: String
}

type MailChimpAccountDetails {
    accountId: String!
    loginId: String!
    accountName: String
    email: String
    firstName: String
    lastName: String
    username: String
    avatarURL: String
}

type ClientMailChimpInfo {
    connected: Boolean!
    account: MailChimpAccountDetails
    lists: [MailChimpList]
}

type Client {
    uuid: UUID!
    shortid: String!
    name: String!
    created: Date!
    modified: Date!
    hidden: Date
    brandingImageURL: String,
    tempId: UUID

    calculators: [Calculator]

    users: [User]
    eventsRange(calculatorUUID: UUID): EventRange

    visits(from: Date!, to: Date, calculatorUUID: UUID): [EventCount]
    engagements(from: Date!, to: Date, calculatorUUID: UUID): [EventCount]
    conversions(from: Date!, to: Date, calculatorUUID: UUID): [EventCount]

    leadCount(calculatorUUID: UUID): Int!
    leadCountInRange(calculatorUUID: UUID, from: Date!, to: Date): Int!
    leads(offset: Int, count: Int, calculatorUUID: UUID): [Lead]
    leadsInRange(offset: Int, count: Int, from: Date!, to: Date, calculatorUUID: UUID): [Lead]

    facebook: ClientFacebookInfo
    mailchimp: ClientMailChimpInfo
}

extend type Query {
    client(id: UUID!): Client
}

extend type Mutation {
    updateClient(clientInput: ClientInput): Boolean
}
`;function getEventTypeFor(a,b,{from:c,to:d,calculatorUUID:e},f){return __awaiter(this,void 0,void 0,function*(){let{getCurrentUser:g,Events:h}=f;if(c&&d)return e?(yield util_1.checkPermissions("calculator",e,f))?yield h.getCalculatorEventsByDay(a,e,moment(c),moment(d)):null:yield h.getClientEventsByDay(a,b.uuid,moment(c),moment(d));const i=moment(c),j=moment(c).startOf("day"),k=moment(c).endOf("day");return e?(yield util_1.checkPermissions("calculator",e,f))?yield h.getCalculatorEventsByHour(a,e,j,k):null:(yield util_1.checkPermissions("client",b.uuid,f))?yield h.getClientEventsByHour(a,b.uuid,j,k):null})}exports.resolvers={Client:{tempId:(a,b,{Clients:c})=>__awaiter(_this,void 0,void 0,function*(){const b=yield c.createTempId(a.uuid);return b.uuid}),mailchimp:(a,b,{context:c,Clients:d})=>{const e=d.getMailChimpAccessTokenForClient(a.uuid);return e},facebook:(a,b,{context:c,Clients:d})=>__awaiter(_this,void 0,void 0,function*(){const b=yield d.getFacebookIdsForClient(a.uuid);return b&&0<b.length?{ids:b||[],connected:!0}:{id:null,connected:!1}}),brandingImageURL:(a,b,{context:c})=>{let d;return d="production"===process.env.NODE_ENV?"":"http://localhost:8080",a.branding_img?d+"/ustatic/"+a.branding_img:d+"/static/img/default-branding.png"},users:(a,b,{Clients:c,Users:d,userId:e})=>__awaiter(_this,void 0,void 0,function*(){if(e==a.uuid){const b=yield c.getUsersForClientById(a.uuid);return yield Promise.all(b.map((a)=>d.getById(a)))}return null}),leadCount:(a,{calculatorUUID:b},c)=>__awaiter(_this,void 0,void 0,function*(){const{Leads:d}=c;return b?(yield util_1.checkPermissions("calculator",b,c))?yield d.countLeadsForCalculator(b):null:(yield util_1.checkPermissions("client",a.uuid,c))?yield d.countLeadsForClient(a.uuid):null}),leads:(a,{offset:b,count:c,calculatorUUID:d},e)=>__awaiter(_this,void 0,void 0,function*(){var f=Math.max;const{Leads:g}=e;return b=f(0,parseInt(b)||0),c=Math.min(f(1,parseInt(c)||0),100),d?(yield util_1.checkPermissions("calculator",d,e))?yield g.getLeadsForCalculator(d,b,c):null:(yield util_1.checkPermissions("client",a.uuid,e))?yield g.getLeadsForClient(a.uuid,b,c):null}),leadCountInRange:(a,{from:b,to:c,calculatorUUID:d},e)=>__awaiter(_this,void 0,void 0,function*(){const{Leads:f}=e;if(b&&c)return d?(yield util_1.checkPermissions("calculator",d,e))?yield f.countLeadsForCalculatorInRange(d,moment(b),moment(c)):null:(yield util_1.checkPermissions("client",a.uuid,e))?yield f.countLeadsForClientInRange(a.uuid,moment(b),moment(c)):null;const g=moment(b),h=moment(b).startOf("day"),i=moment(b).endOf("day");return d?(yield util_1.checkPermissions("calculator",d,e))?yield f.countLeadsForCalculatorInRange(d,h,i):null:(yield util_1.checkPermissions("client",a.uuid,e))?yield f.countLeadsForClientInRange(a.uuid,h,i):null}),leadsInRange:(a,{offset:b,count:c,from:d,to:e,calculatorUUID:f},g)=>__awaiter(_this,void 0,void 0,function*(){var h=Math.max;const{Leads:i}=g;if(b=h(0,parseInt(b)||0),c=Math.min(h(1,parseInt(c)||0),100),d&&e)return f?(yield util_1.checkPermissions("calculator",f,g))?yield i.getLeadsForCalculatorInRange(f,b,c,moment(d),moment(e)):null:(yield util_1.checkPermissions("client",a.uuid,g))?yield i.getLeadsForClientInRange(a.uuid,b,c,moment(d),moment(e)):null;const j=moment(d),k=moment(d).startOf("day"),l=moment(d).endOf("day");return f?(yield util_1.checkPermissions("calculator",f,g))?yield i.getLeadsForCalculatorInRange(f,b,c,k,l):null:(yield util_1.checkPermissions("client",a.uuid,g))?yield i.getLeadsForClientInRange(a.uuid,b,c,k,l):null}),eventsRange:(a,{calculatorUUID:b},c)=>__awaiter(_this,void 0,void 0,function*(){let d,{getCurrentUser:e,Events:f}=c;return b?(yield util_1.checkPermissions("calculator",b,c))&&(d=yield f.getCalculatorEventDaysAvailable("visit",b)):d=yield f.getClientEventDaysAvailable("visit",a.uuid),d?{from:moment(d.min),to:moment(d.max)}:null}),visits:(a,b,c)=>{return getEventTypeFor("visit",a,b,c)},engagements:(a,b,c)=>{return getEventTypeFor("engagement",a,b,c)},conversions:(a,b,c)=>{return getEventTypeFor("conversion",a,b,c)}},ClientMailChimpInfo:{connected:(a,b,{})=>{return!!a},account:(a,b,{context:c})=>__awaiter(_this,void 0,void 0,function*(){if(!a)return null;const b=new mail_chimp_1.MailChimp(a,c),d=yield b.getAccountDetails();return d}),lists:(a,b,{context:c})=>__awaiter(_this,void 0,void 0,function*(){if(!a)return null;const b=new mail_chimp_1.MailChimp(a,c),d=yield b.getLists();return d&&d.lists?d.lists:null})},MailChimpAccountDetails:{accountId:util_1.property("account_id"),loginId:util_1.property("login_id"),accountName:util_1.property("account_name"),firstName:util_1.property("first_name"),lastName:util_1.property("last_name"),username:util_1.property("username"),avatarURL:util_1.property("avatar_url")},MailChimpList:{webId:util_1.property("web_id")},Query:{client:(a,{id:b},c)=>{const{Clients:d}=c;return util_1.checkPermissions("client",b,c)?d.getById(b):null}},Mutation:{updateClient(a,{clientInput:b},{userId:c,Clients:d,Users:e}){return __awaiter(this,void 0,void 0,function*(){const{client_uuid:a}=yield e.getClientUUIDById(c),f={name:b.name,branding_img:void 0};if(b.brandingImageURL){const a=Url.parse(b.brandingImageURL);if(a.path){const b=Path.parse(a.path).base,c=yield db_files_1.checkFileTag(b);"branding"===c&&(f.branding_img=b)}}return yield d.updateById(a,f)})}}};