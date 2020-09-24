exports.up = async function(knex, Promise) {
    await knex.schema.createTable("mailchimp_conn", (table) => {
        table.uuid("org_uuid").primary().notNull().references("uuid").inTable("orgs").onDelete("CASCADE");
        table.string("access_token").notNull();
        table.string("scope");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable("mailchimp_conn");
};
