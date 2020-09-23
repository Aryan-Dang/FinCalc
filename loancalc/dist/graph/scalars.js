"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const graphql_1=require("graphql"),moment=require("moment"),GraphQLUUID=new graphql_1.GraphQLScalarType({name:"UUID",serialize:(a)=>a,parseValue:(a)=>a,parseLiteral:(a)=>{return a.kind===graphql_1.Kind.STRING?a.value:null}}),GraphQLDate=new graphql_1.GraphQLScalarType({name:"Date",serialize:(a)=>a.format(),parseValue:(a)=>moment(a),parseLiteral:(a)=>a.kind===graphql_1.Kind.STRING?moment(a.value):null}),GraphQLJson=new graphql_1.GraphQLScalarType({name:"JSON",serialize:(a)=>a,parseValue:(a)=>a,parseLiteral:(a)=>a.kind===graphql_1.Kind.STRING?JSON.parse(a.value):null});exports.schema=`
scalar UUID
scalar Date
scalar JSON
`,exports.resolvers={UUID:GraphQLUUID,Date:GraphQLDate,JSON:GraphQLJson};