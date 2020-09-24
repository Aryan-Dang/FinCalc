"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
var TimeUnit;
(function (TimeUnit) {
    TimeUnit[TimeUnit["Millisecond"] = 0] = "Millisecond";
    TimeUnit[TimeUnit["Second"] = 1] = "Second";
    TimeUnit[TimeUnit["Minute"] = 2] = "Minute";
    TimeUnit[TimeUnit["Hour"] = 3] = "Hour";
    TimeUnit[TimeUnit["Day"] = 4] = "Day";
    TimeUnit[TimeUnit["Week"] = 5] = "Week";
})(TimeUnit = exports.TimeUnit || (exports.TimeUnit = {}));
class Duration {
    static milliseconds(value) {
        return new Duration(value, TimeUnit.Millisecond);
    }
    static seconds(value) {
        return new Duration(value, TimeUnit.Second);
    }
    static minutes(value) {
        return new Duration(value, TimeUnit.Minute);
    }
    static hours(value) {
        return new Duration(value, TimeUnit.Hour);
    }
    static days(value) {
        return new Duration(value, TimeUnit.Day);
    }
    static weeks(value) {
        return new Duration(value, TimeUnit.Week);
    }
    constructor(value, units) {
        this.value = value;
        this.units = units;
    }
}
exports.Duration = Duration;
function addDuration(date, duration) {
    switch (duration.units) {
        case TimeUnit.Millisecond: return date_fns_1.addMilliseconds(date, duration.value);
        case TimeUnit.Second: return date_fns_1.addSeconds(date, duration.value);
        case TimeUnit.Minute: return date_fns_1.addMinutes(date, duration.value);
        case TimeUnit.Hour: return date_fns_1.addHours(date, duration.value);
        case TimeUnit.Day: return date_fns_1.addDays(date, duration.value);
        case TimeUnit.Week: return date_fns_1.addWeeks(date, duration.value);
        default: throw new Error("Invalid duration units.");
    }
}
exports.addDuration = addDuration;
function subDuration(date, duration) {
    switch (duration.units) {
        case TimeUnit.Millisecond: return date_fns_1.subMilliseconds(date, duration.value);
        case TimeUnit.Second: return date_fns_1.subSeconds(date, duration.value);
        case TimeUnit.Minute: return date_fns_1.subMinutes(date, duration.value);
        case TimeUnit.Hour: return date_fns_1.subHours(date, duration.value);
        case TimeUnit.Day: return date_fns_1.subDays(date, duration.value);
        case TimeUnit.Week: return date_fns_1.subWeeks(date, duration.value);
        default: throw new Error("Invalid duration units.");
    }
}
exports.subDuration = subDuration;
