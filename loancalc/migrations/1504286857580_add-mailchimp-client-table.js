exports.up = (pgm) => {
    pgm.createTable('mailchimp_clients', {
        'client_uuid': { type: 'UUID', notNull: true, references: 'clients(uuid)', onDelete: 'CASCADE', primaryKey: true },
        'access_token': { type: 'VARCHAR(128)' },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('mailchimp_clients');
};
