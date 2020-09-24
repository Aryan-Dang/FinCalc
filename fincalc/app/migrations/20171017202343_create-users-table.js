exports.up = async function(knex, Promise) {
    await knex.schema.createTable("users", function(table) {
        table.uuid("uuid").primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string("email").notNull().unique();
        table.string("password").notNull();
        table.string("first_name").notNull();
        table.string("last_name").notNull();
        table.string("profile_img");
        table.timestamp("last_login_at").defaultTo(knex.fn.now());
        table.uuid("org_uuid")
            .notNull()
            .references("uuid").inTable("orgs")
            .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });

    await knex.schema.raw(`
        CREATE UNIQUE INDEX unique_emails ON users (lower(email));
    `);

    await knex.schema.raw(`
        CREATE TRIGGER update_users_modified
            BEFORE UPDATE ON users
            FOR EACH ROW
            EXECUTE PROCEDURE update_modified_column();
    `);
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable("users");
};
