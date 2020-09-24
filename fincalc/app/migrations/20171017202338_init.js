exports.up = async function(knex, Promise) {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await knex.schema.raw(`
        CREATE OR REPLACE FUNCTION update_modified_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = now();
            RETURN NEW;
        END
        $$ language 'plpgsql';
    `);
};

exports.down = async function(knex, Promise) {
    await knex.schema.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
    await knex.schema.raw("DROP FUNCTION update_modified_column();");
};

