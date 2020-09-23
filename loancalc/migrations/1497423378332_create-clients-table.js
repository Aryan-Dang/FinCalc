/**
 * - Creates the calcusers table and sets up some default values.
 */

exports.up = (pgm) => {
    pgm.createTable('clients', {
        'uuid': { type: 'UUID', unique: true, primaryKey: true, notNull: true },
        'name': { type: 'VARCHAR(128)', notNull: true },
        'created': { type: 'TIMESTAMPTZ', notNull: true },
        'modified': { type: 'TIMESTAMPTZ', notNull: true },
        'hidden': { type: 'TIMESTAMPTZ' }
    });

    // Defaults:
    pgm.alterColumn('clients', 'uuid', { 'default': pgm.func("uuid_generate_v4()") });
    pgm.alterColumn('clients', 'created', { 'default': pgm.func("now()") });
    pgm.alterColumn('clients', 'modified', { 'default': pgm.func("now()") });
    
    // Creates the modified trigger:
    pgm.sql(`
        CREATE TRIGGER update_clients_modified
            BEFORE UPDATE ON clients
            FOR EACH ROW
            EXECUTE PROCEDURE update_modified_column();
    `);
};

exports.down = (pgm) => {
    pgm.dropTable('clients');
};
