/**
 * - Creates the profiles table and sets up some default values.
 */

exports.up = (pgm) => {
    pgm.createTable('profiles', {
        'uuid': { type: 'UUID', unique: true, primaryKey: true, notNull: true },
        'user_uuid': { type: 'UUID', notNull: true, references: 'users(uuid)', onDelete: 'CASCADE' },

        'first_name': { type: 'VARCHAR(128)' },
        'last_name': { type: 'VARCHAR(128)' },

        'created': { type: 'TIMESTAMPTZ', notNull: true },
        'modified': { type: 'TIMESTAMPTZ', notNull: true },
        'hidden': { type: 'TIMESTAMPTZ' }
    });

    // Defaults:
    pgm.alterColumn('profiles', 'uuid', { 'default': pgm.func("uuid_generate_v4()") });
    pgm.alterColumn('profiles', 'created', { 'default': pgm.func("now()") });
    pgm.alterColumn('profiles', 'modified', { 'default': pgm.func("now()") });

    // Indexes
    pgm.createIndex('profiles', 'user_uuid', { name: 'unique_profile_users', unique: true });
    
    // Creates the modified trigger:
    pgm.sql(`
        CREATE TRIGGER update_profiles_modified
            BEFORE UPDATE ON profiles
            FOR EACH ROW
            EXECUTE PROCEDURE update_modified_column();
    `);

    // Creates a trigger that creates a profile for each user.
    pgm.sql(`
        CREATE OR REPLACE FUNCTION create_profile_for_new_user() RETURNS  TRIGGER AS $create_profile_for_user_insert$
            BEGIN
                INSERT INTO profiles(user_uuid)
                VALUES (NEW.uuid);
                RETURN NULL;
            END
        $create_profile_for_user_insert$ LANGUAGE plpgsql;

        CREATE TRIGGER create_profile_for_user_insert
            AFTER INSERT ON users
            FOR EACH ROW EXECUTE PROCEDURE create_profile_for_new_user();
    `);
};

exports.down = (pgm) => {
    pgm.sql(`DROP TRIGGER IF EXISTS create_profile_for_user_insert ON users;`);
    pgm.sql(`DROP FUNCTION IF EXISTS create_profile_for_new_user();`);
    pgm.dropTable('profiles');
};
