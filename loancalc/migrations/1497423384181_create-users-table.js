/**
 * - Creates the calcusers table and sets up some default values.
 */

exports.up = (pgm) => {
    pgm.createTable('users', {
        'uuid': { type: 'UUID', unique: true, primaryKey: true, notNull: true },
        'email': { type: 'CITEXT', unique: true, notNull: true },
        'password': { type: 'VARCHAR(64)', unique: true, notNull: true },
        'role': { type: 'userrole', notNull: true },
        'client_uuid': { type: 'UUID', notNull: true, references: 'clients(uuid)', onDelete: 'CASCADE' },
        'created': { type: 'TIMESTAMPTZ', notNull: true },
        'modified': { type: 'TIMESTAMPTZ', notNull: true },
        'hidden': { type: 'TIMESTAMPTZ' }
    });
    
    // Indexes:
    pgm.createIndex('users', 'email', {
        name: 'unique_email_index',
        unique: true
    });

    // Defaults:
    pgm.alterColumn('users', 'role', { 'default': 'user' });
    pgm.alterColumn('users', 'uuid', { 'default': pgm.func("uuid_generate_v4()") });
    pgm.alterColumn('users', 'created', { 'default': pgm.func("now()") });
    pgm.alterColumn('users', 'modified', { 'default': pgm.func("now()") });
    
    // Creates the modified trigger:
    pgm.sql(`
        CREATE TRIGGER update_calcusers_modified
            BEFORE UPDATE ON users
            FOR EACH ROW
            EXECUTE PROCEDURE update_modified_column();
    `);
};

exports.down = (pgm) => {
    pgm.dropTable('users');
};
