exports.up = (pgm) => {
    pgm.createTable('leads', {
        'uuid': { type: 'UUID', unique: true, primaryKey: true, notNull: true },
        'visitor_uuid': { type: 'UUID' },
        'session_uuid': { type: 'UUID' },
        'first_name': { type: 'VARCHAR(256)' },
        'last_name': { type: 'VARCHAR(256)' },
        'email_address': { type: 'VARCHAR(128)' },
        'phone_number': { type: 'VARCHAR(128)' },
        'metadata': { type: 'JSONB' },
        'calculator_uuid': { type: 'UUID', notNull: true, references: 'calculators(uuid)', onDelete: 'CASCADE' },
        'client_uuid': { type: 'UUID', notNull: true, references: 'clients(uuid)', onDelete: 'CASCADE' },
        'created': { type: 'TIMESTAMPTZ', notNull: true },
        'hidden': { type: 'TIMESTAMPTZ' }
    });

    pgm.alterColumn('leads', 'uuid', { 'default': pgm.func("uuid_generate_v4()") });
    pgm.alterColumn('leads', 'created', { 'default': pgm.func("now()") });
};

exports.down = (pgm) => {
    pgm.dropTable('leads');
};
