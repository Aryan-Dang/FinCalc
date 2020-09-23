"use strict";var _this=this,__awaiter=this&&this.__awaiter||function(a,b,c,d){return new(c||(c=Promise))(function(e,f){function g(a){try{i(d.next(a))}catch(a){f(a)}}function h(a){try{i(d["throw"](a))}catch(a){f(a)}}function i(a){a.done?e(a.value):new c(function(b){b(a.value)}).then(g,h)}i((d=d.apply(a,b||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const util_1=require("../util");exports.schema=`
input CalculatorTermDefInput {
    len: Int
    rate: Float
    units: String
}

input CalculatorMetaInput {
    scrapeTerms: Boolean
    termsPageURL: String 
    termInterests: [CalculatorTermDefInput]

    defaultLoanAmount: Float
    minLoanAmount: Float
    maxLoanAmount: Float

    minDownPayment: Float
    defaultDownPayment: Float

    minTermLength: Int
    defaultTermLength: Int
    maxTermLength: Int

    minInterestRate: Float
    defaultInterestRate: Float
    maxInterestRate: Float

    calculatorType: String
    visPrincipalVisible: Boolean
    visInterestVisible: Boolean

    loanAmountName: String
    downPaymentName: String
    interestRateName: String

    applyRedirectText: String
    applyRedirect: String
}

type CalculatorTermDef {
    len: Int
    rate: Float
    units: String
}

type CalculatorMeta {
    scrapeTerms: Boolean
    termsPageURL: String
    termInterests: [CalculatorTermDef]

    defaultLoanAmount: Float
    minLoanAmount: Float
    maxLoanAmount: Float

    minDownPayment: Float
    defaultDownPayment: Float

    minTermLength: Int
    defaultTermLength: Int
    maxTermLength: Int

    minInterestRate: Float
    defaultInterestRate: Float
    maxInterestRate: Float

    calculatorType: String
    visPrincipalVisible: Boolean
    visInterestVisible: Boolean

    loanAmountName: String
    downPaymentName: String
    interestRateName: String
    
    applyRedirectText: String
    applyRedirect: String
}

type Calculator {
    uuid: UUID!
    shortid: String!
    client: Client!
    name: String
    calculatorType: String
    metadata: CalculatorMeta
    created: Date!
    modified: Date!
    hidden: Date

    leadCount: Int!
    leads(offset: Int, count: Int): [Lead]
}

type CalculatorReduced {
    name: String
    calculatorType: String!
    uuid: UUID!
    shortid: String!
    created: Date!
    modified: Date!

    leadCount: Int!
    leads(offset: Int, count: Int): [Lead]
}

type CalculatorReducedList {
    calculators: [CalculatorReduced]
}

extend type Query {
    calculator(uuid: UUID, shortid: String): Calculator

    # Ideally this should just be connected to a client
    # But graphql just doesn't seem to be in a place where I can
    # do that efficiently right now so I'm using this at the moment.
    listCalculators(offset: Int, count: Int): [CalculatorReduced]
}

extend type Mutation {
    createCalculator(name: String!, metadata: CalculatorMetaInput): Calculator!
    updateCalculator(uuid: UUID, shortid: String, name: String!, metadata: CalculatorMetaInput): Boolean!
    deleteCalculator(uuid: UUID!): Boolean!
}
`,exports.resolvers={Calculator:{client:(a,b,{Clients:c})=>{return c.getById(a.client_uuid)},calculatorType:util_1.property("calc_type")},CalculatorReduced:{calculatorType:util_1.property("calc_type")},Query:{calculator:(a,{uuid:b,shortid:c},{getCurrentUser:d,Calculators:e})=>__awaiter(_this,void 0,void 0,function*(){if(!b&&!c)throw new Error("ID and ShortID cannot both be null.");let a=b?yield e.getById(b):yield e.getByShortId(c);const f=yield d();return f.client_uuid==a.client_uuid?a:null}),listCalculators:(a,{offset:b,count:c},{getCurrentUser:d,Calculators:e})=>__awaiter(_this,void 0,void 0,function*(){var a=Math.max;let f=yield d();const g=a(b||0,0),h=a(Math.min(c||1,100),1),i=yield e.listCalculators(f.client_uuid,g,h);return i})},Mutation:{createCalculator:(a,{name:b,metadata:c},{getCurrentUser:d,Calculators:e})=>__awaiter(_this,void 0,void 0,function*(){const a=yield d(),f=c?c.calculatorType:"",{uuid:g}=yield e.createCalculator(b,f,c,a.client_uuid);return yield e.getById(g)}),deleteCalculator:(a,{uuid:b},{getCurrentUser:c,Calculators:d})=>__awaiter(_this,void 0,void 0,function*(){const a=yield c(),e=yield d.getCalculatorClientIdByUUID(b);if(e&&e.client_uuid===a.client_uuid)return yield d.deleteCalculatorByUUID(b);throw new Error("Insufficient permissions.")}),updateCalculator:(a,{uuid:b,shortid:c,name:d,metadata:e},{getCurrentUser:f,Calculators:g})=>__awaiter(_this,void 0,void 0,function*(){const a=yield f(),h=e?e.calculatorType:"";if(b){const c=yield g.getCalculatorClientIdByUUID(b);if(c&&c.client_uuid===a.client_uuid)return yield g.updateCalculatorByUUID(b,d,h,e),!0;throw new Error("Insufficient permissions.")}else if(c){const b=yield g.getCalculatorClientIdByShortId(c);if(b&&b.client_uuid===a.client_uuid)return yield g.updateCalculatorByShortId(c,d,h,e),!0;throw new Error("Insufficient permissions.")}else throw new Error("Calculator Short ID or UUID must be specified.")})}};