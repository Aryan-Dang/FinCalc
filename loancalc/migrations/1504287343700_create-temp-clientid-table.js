exports.up = (pgm) => {
    pgm.createTable('temp_client_uuids', {
        'temp_client_uuid': { type: 'UUID', notNull: true, primaryKey: true },
        'real_client_uuid': { type: 'UUID', notNull: true, references: 'clients(uuid)', onDelete: 'CASCADE' },
        'created': { type: 'TIMESTAMPTZ', notNull: true },
        'used': { type: 'BOOLEAN', notNull: true }
    });
    pgm.alterColumn('temp_client_uuids', 'temp_client_uuid', { 'default': pgm.func("uuid_generate_v4()") });
    pgm.alterColumn('temp_client_uuids', 'used', { 'default': 'FALSE' });
    pgm.alterColumn('temp_client_uuids', 'created', { 'default': pgm.func("now()") });
};

exports.down = (pgm) => {
    pgm.dropTable('temp_client_uuids');
};
