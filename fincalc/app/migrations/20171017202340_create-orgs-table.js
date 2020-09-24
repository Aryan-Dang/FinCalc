exports.up = async function(knex, Promise) {
    await knex.schema.createTable("orgs", function(table) {
        table.uuid("uuid").primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string("name").notNull();
        table.string("branding_img");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });

    await knex.schema.raw(`
        CREATE TRIGGER update_orgs_modified
            BEFORE UPDATE ON orgs
            FOR EACH ROW
            EXECUTE PROCEDURE update_modified_column();
    `);
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable("orgs");
};
