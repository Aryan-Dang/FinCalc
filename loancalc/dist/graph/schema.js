"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const merge=require("lodash.merge"),graphql_tools_1=require("graphql-tools"),schema_1=require("./clients/schema"),schema_2=require("./users/schema"),schema_3=require("./profiles/schema"),schema_4=require("./events/schema"),schema_5=require("./calculators/schema"),schema_6=require("./leads/schema"),scalars_1=require("./scalars"),rootSchema=`
type Query {
    q: String!
}

type Mutation {
    m(a: String!): String!
}

# type Subscription {
# }

schema {
    query: Query
    mutation: Mutation
#    subscription: Subscription
}
`,rootResolvers={Query:{q:()=>"query"},Mutation:{m:()=>"mutation"}},schema=[rootSchema,schema_1.schema,schema_2.schema,schema_4.schema,schema_3.schema,schema_5.schema,schema_6.schema,scalars_1.schema],resolvers=merge(rootResolvers,schema_1.resolvers,schema_2.resolvers,schema_4.resolvers,schema_3.resolvers,schema_5.resolvers,schema_6.resolvers,scalars_1.resolvers),executableSchema=graphql_tools_1.makeExecutableSchema({typeDefs:schema,resolvers});exports.default=executableSchema;