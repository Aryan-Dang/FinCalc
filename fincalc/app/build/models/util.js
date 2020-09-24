"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PropertyFilter {
    constructor(options) {
        this.allowedKeys = new Set(options.allowed || undefined) || null;
        this.requiredKeys = options.required || null;
        if (this.allowedKeys && this.requiredKeys) {
            for (const r of this.requiredKeys) {
                this.allowedKeys.add(r);
            }
        }
    }
    child(options) {
        if (this.allowedKeys) {
            if (!options.allowed) {
                options.allowed = [];
            }
            for (const item of this.allowedKeys) {
                options.allowed.push(item);
            }
        }
        if (this.requiredKeys) {
            if (!options.required) {
                options.required = [];
            }
            for (const item of this.requiredKeys) {
                options.required.push(item);
            }
        }
        return new PropertyFilter({
            name: options.name ? options.name : this.modelName,
            allowed: options.allowed,
            required: options.required
        });
    }
    filterAll(raws) {
        return raws.map((r) => this.filter(r));
    }
    filter(raw) {
        let output = raw;
        if (this.allowedKeys) {
            let newOutput = {};
            for (const key in output) {
                if (this.allowedKeys.has(key)) {
                    newOutput[key] = output[key];
                }
            }
            output = newOutput;
        }
        if (this.requiredKeys) {
            for (const key of this.requiredKeys) {
                if (typeof output[key] === undefined) {
                    throw new ModelError(`Cannot filter as ${this.modelName}. Missing property: "${key}".`);
                }
            }
        }
        return output;
    }
}
exports.PropertyFilter = PropertyFilter;
class ModelError extends Error {
    constructor(message) {
        super(`ModelError [${message}]`);
    }
}
exports.ModelError = ModelError;
function autoConvertJSON(obj, ...properties) {
    for (const prop of properties) {
        if (typeof obj[prop] === "object") {
            obj[prop] = JSON.stringify(obj[prop]);
        }
    }
    return obj;
}
exports.autoConvertJSON = autoConvertJSON;
class DBOrdering {
    static isDir(s) {
        if (s) {
            const l = s.toLowerCase();
            return l === "desc" || l === "asc";
        }
        else {
            return false;
        }
    }
    static single(col, dir) {
        const o = new DBOrdering();
        o.add(col, dir);
        return o;
    }
    add(col, dir) {
        if (!this.orderings)
            this.orderings = [];
        this.orderings.push({ col, dir });
    }
    apply(builder) {
        if (this.orderings) {
            return this.orderings.reduce((builder, { col, dir }) => builder.orderBy(col, dir), builder);
        }
        else {
            return builder;
        }
    }
}
DBOrdering.DESC = "DESC";
DBOrdering.ASC = "ASC";
exports.DBOrdering = DBOrdering;
