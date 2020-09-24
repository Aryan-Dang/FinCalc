exports.up = async function(knex, Promise) {
    await knex.schema.createTable("leads", function(table) {
        table.increments("id").primary();
        table.string("name");
        table.string("email");
        table.string("phone_number");

        table.decimal("amount", 16, 2);
        table.integer("term");

        // we store the name and type of the calculator in case it gets deleted.
        // the name may be outdated but at least we'll have something.
        // I could try to keep the name of the calculator synchronized but
        // once we start generating a bunch of these things that will mean
        // a lot of things get touched every time a field on a calculator is updated.
        table.string("calc_name");
        table.string("calc_type");
        table.uuid("calc_uuid").references("uuid").inTable("calculators").onDelete("SET NULL");
        table.uuid("org_uuid").references("uuid").inTable("orgs").onDelete("CASCADE");

        table.timestamp("created_at").defaultTo(knex.fn.now());
    });


    // This function just updates the lead's calc_name and calc_type automatically based on the
    // calculator's UUID.
    await knex.schema.raw(`
        CREATE OR REPLACE FUNCTION update_leads_calculator_params()
        RETURNS TRIGGER AS $$
        DECLARE
            calculator_row RECORD;
        BEGIN
            SELECT name, calc_type, org_uuid FROM calculators WHERE calculators.uuid = NEW.calc_uuid INTO calculator_row;
            NEW.calc_name = calculator_row.name;
            NEW.calc_type = calculator_row.calc_type;
            NEW.org_uuid = calculator_row.org_uuid;
            RETURN NEW;
        END
        $$ language 'plpgsql';
    `);

    await knex.schema.raw(`
        CREATE TRIGGER set_leads_calculator_params_on_insert
            BEFORE INSERT ON leads
            FOR EACH ROW
            EXECUTE PROCEDURE update_leads_calculator_params();
    `);
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable("leads");
    await knex.schema.raw(`DROP FUNCTION update_leads_calculator_params();`);
};
