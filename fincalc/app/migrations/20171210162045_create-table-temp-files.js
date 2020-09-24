exports.up = async function(knex, Promise) {
    await knex.schema.createTable("temp_files", (table) => {
        table.string("filepath");
        table.timestamp("expires_at");
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.dropTable("temp_files");
};
