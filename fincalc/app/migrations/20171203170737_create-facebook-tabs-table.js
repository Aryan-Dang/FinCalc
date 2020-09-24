exports.up = async function(knex, Promise) {
    await knex.schema.createTable("facebook_tabs", (table) => {
        table.uuid("org_uuid").notNull().references("uuid").inTable("orgs").onDelete("CASCADE");
        table.string("page_id").notNull().unique();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });

    await knex.schema.alterTable("facebook_tabs", (table) => {
        table.primary(["org_uuid", "page_id"]);
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable("facebook_tabs");
};
