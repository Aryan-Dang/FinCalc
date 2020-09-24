const Faker = require("faker");
const moment = require("moment");
const uuidv4 = require("uuid/v4");

const inprogressQueries = new WeakMap();
function _queryBegin(context) {
    // if (!context.client) return;
    // inprogressQueries.set(context.client, process.hrtime());
}
function _queryEnd(context) {
    // if (!context.client) return;
    // const startTime = inprogressQueries.get(context.client);
    // if (startTime) {
    //     if (context.query) {
    //         const elapsed = process.hrtime(startTime);
    //         const ms = elapsed[0] * 1000 + elapsed[1] / 1000000;    
    //         console.log("[query] [%sms] %s", ms.toFixed(3).replace(/\.?0+$/, ""), context.query);
    //     }
    // }
    // inprogressQueries.delete(context.client);
}
const initOptions = {
    query: (context) => {
        _queryBegin(context);
    },

    error: (err, context) => {
        if (context.query) {
            console.error("Error While Running: `%s`", context.query);
        }
        _queryEnd(context);
    },

    receive: (data, result, context) => {
        _queryEnd(context);
    }
};

const pgp = require('pg-promise')(initOptions);
const db = pgp({
    host: "localhost",
    port: 5432,
    database: "fincalc",
    user: "fincalc",
    password: "fincalc",
});

function randIn(min, max) {
    return min + Math.round(Math.random() * (max - min));
}

function randPercent(percent) {
    return randIn(0, 100) <= percent;
}

let programState = {
    visits: 0,
    engagements: 0,
    conversions: 0,
};

async function generateVisit(day, calculator, visitorUUID, sessionUUID) {
    programState.visits++;
    await db.any(`
INSERT INTO events(event_type, calc_uuid, org_uuid, visitor_uuid, session_uuid, metadata, is_unique, created_at)
VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
);
    `.trim(), [
        "visit",
        calculator.uuid,
        calculator.org_uuid,
        visitorUUID,
        sessionUUID,
        "{}",
        true,
        typeof day === "string" ? day : day.format()
    ]);
}

async function generateEngagement(day, calculator, visitorUUID, sessionUUID) {
    programState.engagements++;
    await db.any(`
INSERT INTO events(event_type, calc_uuid, org_uuid, visitor_uuid, session_uuid, metadata, is_unique, created_at)
VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
);
    `.trim(), [
        "engagement",
        calculator.uuid,
        calculator.org_uuid,
        visitorUUID,
        sessionUUID,
        "{}",
        true,
        typeof day === "string" ? day : day.format()
    ]);
}

async function generateConversion(day, calculator, visitorUUID, sessionUUID) {
    programState.conversions++;
    const _day = typeof day === "string" ? day : day.format();
    const event = db.any(`
INSERT INTO events(event_type, calc_uuid, org_uuid, visitor_uuid, session_uuid, metadata, is_unique, created_at)
VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
);
    `.trim(), [
        "conversion",
        calculator.uuid,
        calculator.org_uuid,
        visitorUUID,
        sessionUUID,
        "{}",
        true,
        _day
    ]);


    const lead = db.any(`
INSERT INTO leads (name, email, phone_number, amount, term, calc_name, calc_type, calc_uuid, created_at, source_type)
VALUES(
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
);
    `.trim(), [
        Faker.name.findName(),
        Faker.internet.email(),
        Faker.phone.phoneNumber(),
        randIn(5000, 100000),
        randIn(6, 84),
        calculator.name,
        calculator.calc_type,
        calculator.uuid,
        _day,
        "web"
    ]);

    await Promise.all([event, lead]);
}

async function generateDayForCalc(day, calculator) {
    const ENGAGEMENT_PERCENT = randPercent(80);
    const CONVERSION_PERCENT = randPercent(10);
    const engage = ENGAGEMENT_PERCENT;
    const convert = engage && CONVERSION_PERCENT;
    const visitorUUID = uuidv4();
    const sessionUUID = uuidv4();
    const promises = [
        generateVisit(day, calculator, visitorUUID, sessionUUID),
        engage ? generateEngagement(day, calculator, visitorUUID, sessionUUID) : nullPromise,
        convert ? generateConversion(day, calculator, visitorUUID, sessionUUID) : nullPromise,
    ];
    await Promise.all(promises);
}

const nullPromise = Promise.resolve(null);
async function generateDay(day, visitsMin, visitsMax, calculators) {
    const visits = calculators.map((calc) => randIn(visitsMin, visitsMax));
    const visitsStr = visits.join(", ");
    const visitsCount = visits.reduce((acc, n) => acc + n, 0);
    const promises = calculators.map(() => nullPromise);
    
    let _executedVisits = 0;
    const _genPromises = () => {
        for (let idx = 0; idx < promises.length; idx++) {
            if (visits[idx] < 1) {
                promises[idx] = nullPromise;
            } else {
                _executedVisits++;
                promises[idx] = generateDayForCalc(day, calculators[idx]);
                visits[idx] = visits[idx] - 1;
            }
        }
    };

    const _hasMore = () => {
        return visits.reduce((acc, n) => acc + n, 0) > 0;
    };

    let cycles = 0;
    while (_hasMore()) {
        _genPromises();
        await Promise.all(promises);

        cycles++
        if (cycles > 100) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`[${((_executedVisits / visitsCount * 100) | 0)}%] [${_executedVisits} / ${visitsCount} visits]`);
            cycles = 0;
        }
    }

    return visitsCount;
}

/**
 * @param {string[]} uuids UUIDs for calculators to get.
 */
function getCalculators(orgUUID) {
    // const list = uuids.reduce((acc, id) => acc.length > 0 ? `,'${id}'` : `'${id}'`, "");
    // return db.any(`SELECT * FROM calculators WHERE uuid IN (${list});`);
    return db.any(`SELECT * FROM calculators WHERE org_uuid = $1;`, orgUUID);
}

function buildArgsObject(args) {
    return args.reduce((obj, arg) => {
        const index = arg.indexOf(":");
        if (index >= 0) {
            const name = arg.substring(0, index);
            const value = arg.substr(index + 1);
            obj[name.trim()] = value.trim();
        }
        return obj;
    }, {});
}

function getarg(argobj, name, def, format) {
    const val = argobj[name];
    if (typeof val === "undefined") {
        if (typeof def === "undefined") {
            if (format) {
                console.error(`Missing required argument: ${name} (format: ${format})`);
            } else {
                console.error("Missing required argument: " + name);
            }
            process.exit(1);
            throw new Error("Unreachable.");
        } else {
            return def;
        }
    }
    return val;
}

/**
 * @param {string[]} argv arguments.
 */
async function main(argv) {
    const args = argv.slice(2);
    // if (args.length < 3) { console.error("[error] Not enough arguments."); return; }
    const argsobj = buildArgsObject(args);
    const orgUUID = getarg(argsobj, "orguuid");
    const [durationStr, durationUnits] = getarg(argsobj, "before", undefined, "dur,units").split(",");
    const [afterDurationStr, afterDurationUnits] = getarg(argsobj, "after", "0,days", "dur,units").split(",");
    const [visitsMinStr, visitsMaxStr] = getarg(argsobj, "visits", undefined, "min,max").split(",");
    const durationValue = parseInt(durationStr);
    const afterDurationValue = parseInt(afterDurationStr);
    if (!durationValue || !durationUnits) {
        console.error("[error] Invalid durations.");
        return;
    }
    const visitsMin = parseInt(visitsMinStr);
    const visitsMax = parseInt(visitsMaxStr);
    if (!visitsMin || !visitsMax || visitsMax < visitsMin) {
        console.error("[error] Invalid visits min and max.");
        return;
    }
    const duration = moment.duration(durationValue, durationUnits);
    console.log("[gen] Duration (back) %s", duration.humanize());

    const afterDuration = moment.duration(afterDurationValue, durationUnits);
    console.log("[gen] Duration (forward) %s", duration.humanize());
    
    const startDate = moment().subtract(duration);
    console.log("[gen] Starting From: %s", startDate.format("LL"));

    const days = (moment().add(afterDuration, afterDurationUnits)).diff(startDate, "days");
    console.log("[gen] Generating data for %d days.", days);

    const calculators = await getCalculators(orgUUID);
    
    console.log("Calculators:");
    calculators.forEach((calc) => {
        console.log("\t" + calc.name);
    });

    let endingDay;
    for (let d = 0; d < days; d++) {
        const currentDay = moment(startDate).add(d, 'days');
        endingDay = currentDay;
        console.log("[%d%] [GENERATING DAY %d/%d] [%d visits, %d engagements, %d conversions] %s",
            ((d + 1) / days * 100) | 0, 
            d + 1, 
            days, 

            programState.visits,
            programState.engagements,
            programState.conversions,

            currentDay.format("LL"));
        await generateDay(currentDay, visitsMin, visitsMax, calculators);
        process.stdout.clearLine();
        process.stdout.moveCursor(0, -1);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
    }
    

    console.log(
        "[%d%] [GENERATING DAY %d/%d] [%d visits, %d engagements, %d conversions] %s",
        100, 
        days, 
        days, 

        programState.visits,
        programState.engagements,
        programState.conversions,

        endingDay
    );
}
// Adolph's Bank: 8E3ADCC2-BF74-4864-B055-6A45423629A4

const startTime = process.hrtime();
main(process.argv).then(
    function() {
        const elapsed = process.hrtime(startTime);
        console.log("[main] duration: %f.%fs", elapsed[0], (elapsed[1] / 100000000) | 0);
        process.exit(0);
    },

    function(err) {
        console.error("Error occurred while running main function: ", err);
        process.exit(101);
    }
);