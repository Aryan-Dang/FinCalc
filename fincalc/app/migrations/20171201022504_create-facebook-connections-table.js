exports.up = async function(knex, Promise) {
    await knex.schema.createTable("facebook_conn", (table) => {
        table.uuid("org_uuid").primary().notNull().references("uuid").inTable("orgs").onDelete("CASCADE");
        table.string("userid").notNull().unique();
        table.string("access_token").notNull();
        table.string("token_type");
        table.timestamp("expires_at").notNull();
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable("facebook_conn");
};
