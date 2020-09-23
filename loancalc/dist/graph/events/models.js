"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const serve_1=require("../../serve");class Events{getClientEventDaysAvailable(a,b){const c=`
            SELECT min(day), max(day)
            FROM client_calc_events_by_day evt
            WHERE 
                evt.client_uuid = $1 AND
                (evt.event_type = $2 OR evt.event_type = $2 || '.unique');`;return serve_1.db.oneOrNone(c,[b,a])}getCalculatorEventDaysAvailable(a,b){const c=`
        SELECT min(day), max(day)
        FROM calc_events_by_day evt
        WHERE 
            evt.calculator_uuid = $1 AND
            (evt.event_type = $2 OR evt.event_type = $2 || '.unique');`;return serve_1.db.oneOrNone(c,[b,a])}getCalculatorEventsByHour(a,b,c,d){const e=`
            SELECT
                evt.hour AS "time",
                evt.event_count as "count"
            FROM calc_events_by_hour evt
            WHERE
                evt.calculator_uuid = $1 AND
                (evt.event_type = $2 OR evt.event_type = $2 || '.unique') AND
                evt.hour >= $3::timestamptz AND evt.hour <= $4::timestamptz;
        `;return serve_1.db.manyOrNone(e,[b,a,c.format(),d.format()])}getCalculatorEventsByDay(a,b,c,d){const e=`
            SELECT
                evt.day::timestamptz AS "time",
                evt.event_count AS "count"
            FROM calc_events_by_day evt
            WHERE
                evt.calculator_uuid = $1 AND
                (evt.event_type = $2 OR evt.event_type = $2 || '.unique') AND
                evt.day >= $3::date AND evt.day <= $4::date;
        `;return serve_1.db.manyOrNone(e,[b,a,c.format(),d.format()])}getClientEventsByHour(a,b,c,d){const e=`
            SELECT
                evt.hour AS "time",
                evt.event_count as "count"
            FROM client_calc_events_by_hour evt
            WHERE
                evt.client_uuid = $1 AND
                (evt.event_type = $2 OR evt.event_type = $2 || '.unique') AND
                evt.hour >= $3::timestamptz AND evt.hour <= $4::timestamptz;
        `;return serve_1.db.manyOrNone(e,[b,a,c.format(),d.format()])}getClientEventsByDay(a,b,c,d){const e=`
            SELECT
                evt.day::timestamptz AS "time",
                evt.event_count AS "count"
            FROM client_calc_events_by_day evt
            WHERE
                evt.client_uuid = $1 AND
                (evt.event_type = $2 OR evt.event_type = $2 || '.unique') AND
                evt.day >= $3::date AND evt.day <= $4::date;
        `;return serve_1.db.manyOrNone(e,[b,a,c.format(),d.format()])}}exports.Events=Events;