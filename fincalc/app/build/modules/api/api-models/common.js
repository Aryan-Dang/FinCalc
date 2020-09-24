"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../util/index");
class ModelListRequest {
    constructor(src) {
        this.offset = undefined;
        this.count = undefined;
        this.fields = undefined;
        this.order_by = undefined;
        this.order_dir = undefined;
        if (src)
            index_1.copyIntoDestination(src, this);
        // eventually the right types :P
        if (typeof this.offset === "string")
            this.offset = parseInt(this.offset);
        else
            this.offset = 0;
        if (typeof this.count === "string")
            this.count = parseInt(this.count);
        else
            this.count = 0;
    }
}
exports.ModelListRequest = ModelListRequest;
class ModelRangedListRequest {
    constructor(src) {
        this.offset = undefined;
        this.count = undefined;
        this.fields = undefined;
        this.order_by = undefined;
        this.order_dir = undefined;
        this.from = undefined;
        this.to = undefined;
        if (src)
            index_1.copyIntoDestination(src, this);
        // eventually the right types :P
        if (typeof this.offset === "string")
            this.offset = parseInt(this.offset);
        else
            this.offset = 0;
        if (typeof this.count === "string")
            this.count = parseInt(this.count);
        else
            this.count = 0;
    }
}
exports.ModelRangedListRequest = ModelRangedListRequest;
