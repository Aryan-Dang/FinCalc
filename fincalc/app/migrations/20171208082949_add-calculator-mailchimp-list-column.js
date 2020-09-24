exports.up = async function(knex, Promise) {
    await knex.schema.table("calculators", function(table) {
        table.string("mailchimp_list");
    });
};

exports.down = async function(knex, Promise) {
    await knex.schema.table("calculators", function(table) {
        table.dropColumn("mailchimp_list");
    });
};
