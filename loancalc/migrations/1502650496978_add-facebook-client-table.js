exports.up = (pgm) => {
    pgm.createTable('facebook_clients', {
        'facebook_id': { type: 'VARCHAR(128)', primaryKey: true },
        'client_uuid': { type: 'UUID', notNull: true, references: 'clients(uuid)', onDelete: 'CASCADE' }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('facebook_clients');
};
