exports.up = async function(knex, Promise) {
    await knex.schema.createTable("events", (table) => {
        table.increments("id").primary();
        table.string("event_type");
        table.uuid("calc_uuid").notNull().references("uuid").inTable("calculators").onDelete("SET NULL");
        table.uuid("org_uuid").notNull().references("uuid").inTable("orgs").onDelete("CASCADE");
        table.uuid("visitor_uuid");
        table.uuid("session_uuid");
        table.json("metadata");
        table.boolean("is_unique");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex, Promise) {
    await knex.schem.dropTable("events");
};
