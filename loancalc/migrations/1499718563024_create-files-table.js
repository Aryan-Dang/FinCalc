exports.up = (pgm) => {
    // VARCHAR(53) used for filenames:
    // - 36 characters for UUID
    // - 1 character for '.'
    // - 16 characters max for extension

    pgm.createTable('db_files', {
        'id': { type: 'SERIAL', primaryKey: true },
        'directory': { type: 'VARCHAR(64)', notNull: true },
        'filename': { type: 'VARCHAR(53)', unique: true, notNull: true },
        'tag': { type: 'VARCHAR(64)' },
        'created': { type: 'TIMESTAMPTZ', notNull: true },
        'garbage': { type: 'BOOLEAN', notNull: true }
    });

    pgm.alterColumn('db_files', 'created', { 'default': pgm.func("now()") });
    pgm.alterColumn('db_files', 'garbage', { 'default': 'FALSE' });

    pgm.addColumns('profiles', {
        'profile_img': { type: 'VARCHAR(53)', references: 'db_files(filename)' },
    });
};

exports.down = (pgm) => {
    pgm.dropColumns('profiles', ['profile_img']);
    pgm.dropTable('db_files');
};
