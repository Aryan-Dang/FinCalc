"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const util_1=require("../util");exports.schema=`
type Lead {
    uuid: UUID!
    firstName: String
    lastName: String
    emailAddress: String
    phoneNumber: String
    metadata: JSON
    calculatorUUID: UUID!
    clientUUID: UUID!
    calculator: Calculator!
    client: Client!
    created: Date!
}
`,exports.resolvers={Lead:{firstName:util_1.property("first_name"),lastName:util_1.property("last_name"),emailAddress:util_1.property("email_address"),phoneNumber:util_1.property("phone_number"),calculatorUUID:util_1.property("calculator_uuid"),clientUUID:util_1.property("client_uuid"),calculator:(a,b,{Calculators:c})=>{return c.getById(a.calculator_uuid)},client:(a,b,{Clients:c})=>{return c.getById(a.client_uuid)}},Query:{}};