exports.up = async function(knex, Promise) {
    await knex.schema.table("leads", function(table) {
        table.string("source_type");
        table.uuid("source_uuid");
    });   
};

exports.down = async function(knex, Promise) {
    await knex.schema.table("calculators", function(table) {
        table.dropColumn("source_type");
        table.dropColumn("source_uuid");
    }); 
};
