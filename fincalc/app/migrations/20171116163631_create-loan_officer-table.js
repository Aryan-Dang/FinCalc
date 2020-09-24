exports.up = async function(knex, Promise) {
    await knex.schema.createTable("loanofficers", (table) => {
        table.uuid("uuid").primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string("name");
        table.string("profile_img");
        table.string("slug").unique();
        table.json("colors");
        table.uuid("org_uuid")
            .notNull()
            .references("uuid").inTable("orgs")
            .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });


    await knex.schema.raw(`
    CREATE TRIGGER update_loan_officers_modified
        BEFORE UPDATE ON loanofficers
        FOR EACH ROW
        EXECUTE PROCEDURE update_modified_column();
`);
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable("loanofficers");
};
