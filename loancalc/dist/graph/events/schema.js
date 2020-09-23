"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.schema=`
type EventRange {
    from: Date!
    to: Date!
}

type EventCount {
    time: Date!,
    count: Int!
}
`,exports.resolvers={EventCount:{},EventRange:{}};