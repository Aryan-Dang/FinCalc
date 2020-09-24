exports.up = async function(knex, Promise) { 
    await knex.schema.createTable("internal_ids", (table) => {
        table.uuid("uuid").primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid("mapsto");
        table.string("purpose");
        table.timestamp("expires_at");
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable("internal_ids");
};
