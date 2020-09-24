
exports.up = async function(knex, Promise) {
    await knex.schema.table("calculators", function(table) {
        table.string("shortid").unique().notNull();
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.table("calculators", function(table) {
        table.dropColumn("shortid");
    }); 
};
