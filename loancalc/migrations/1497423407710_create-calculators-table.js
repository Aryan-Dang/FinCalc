/**
 * - Creates the calcusers table and sets up some default values.
 */

exports.up = (pgm) => {
    pgm.createTable('calculators', {
        'uuid': { type: 'UUID', unique: true, primaryKey: true, notNull: true },
        'shortid': { type: 'VARCHAR(32)', unique: true, primaryKey: false, notNull: true },
        'client_uuid': { type: 'UUID', notNull: true, references: 'clients(uuid)', onDelete: 'CASCADE' },
        'name': { type: 'VARCHAR(128)', notNull: true },
        'calc_type': { type: 'VARCHAR(128)', notNull: true },
        'metadata': 'json',
        'created': { type: 'TIMESTAMPTZ', notNull: true },
        'modified': { type: 'TIMESTAMPTZ', notNull: true },
        'hidden': { type: 'TIMESTAMPTZ' }
    });

    // Defaults:
    pgm.alterColumn('calculators', 'uuid', { 'default': pgm.func("uuid_generate_v4()") });
    pgm.alterColumn('calculators', 'created', { 'default': pgm.func("now()") });
    pgm.alterColumn('calculators', 'modified', { 'default': pgm.func("now()") });


    // Indexes
    pgm.createIndex('calculators', 'shortid', { name: 'unique_calculator_shortid', unique: true });
    
    // Creates the modified trigger:
    pgm.sql(`
        CREATE TRIGGER update_calculators_modified
            BEFORE UPDATE ON calculators
            FOR EACH ROW
            EXECUTE PROCEDURE update_modified_column();
    `);
};

exports.down = (pgm) => {
    pgm.dropTable('calculators');
};
