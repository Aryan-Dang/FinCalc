const FileSystem = require('fs');
const Path = require('path');

exports.up = (pgm) => {
    const calculator_event_functions = FileSystem.readFileSync(Path.resolve(__dirname, 'sql/calculator-event-functions.pgsql')).toString('utf-8');

    /**
     * CALC EVENTS TABLE:
     */
    pgm.createTable('calc_events', {
        'id': { type: 'BIGSERIAL', primaryKey: true },
        'visitor_uuid': { type: 'UUID', notNull: true },
        'session_uuid': { type: 'UUID', notNull: true },
        'calculator_uuid': { type: 'UUID', notNull: true },
        'client_uuid': { type: 'UUID', notNull: true },
        'event_type': { type: 'VARCHAR(128)', notNull: true },
        'payload': { type: 'JSON' },
        'created': { type: 'TIMESTAMPTZ', notNull: true },
        'processed': { type: 'BOOLEAN', notNull: true },
        // 'is_unique': { type: 'BOOLEAN', notNull: true },
    });

    // Defaults:
    pgm.alterColumn('calc_events', 'created', { 'default': pgm.func("now()") });
    pgm.alterColumn('calc_events', 'processed', { 'default': 'FALSE' });
    // pgm.alterColumn('calc_events', 'is_unique', { 'default': 'FALSE' });

    /**
     * CALC EVENTS PROCESSING QUEUE
     */
    // #TODO: Going to need this in the future (remember down migrations):
    // pgm.createTable('calc_events_queue', {
    //     'event_id': { type: 'BIGINT', notNull: true, references: 'calc_events(id)', onDelete: 'CASCADE' }
    // });

    /**
     * EVENT PROCESSING QUEUE TRIGGER:
     */
    // #TODO: Going to need this in the future (remember down migrations):
    // pgm.sql(`
    //     CREATE OR REPLACE FUNCTION queue_calc_event_for_processing()
    //     RETURNS TRIGGER AS $$
    //     BEGIN
    //         INSERT INTO calc_events_queue(event_id)
    //         VALUES (NEW.id);
    //         RETURN NEW;
    //     END
    //     $$ language 'plpgsql';

    //     CREATE TRIGGER queue_calc_event_for_processing_on_create
    //     AFTER INSERT ON calc_events
    //     FOR EACH ROW
    //     EXECUTE PROCEDURE queue_calc_event_for_processing();
    // `);

    /**
     * CALC EVENTS BY HOUR TABLE:
     */
    pgm.createTable('calc_events_by_hour', {
        'event_count': { type: 'INT', notNull: true },
        'event_type': { type: 'VARCHAR(128)', notNull: true },
        'calculator_uuid': { type: 'UUID', notNull: true },
        'hour': { type: 'TIMESTAMP', notNull: true }
    });

    pgm.sql(`
        ALTER TABLE calc_events_by_hour ADD PRIMARY KEY (event_type, calculator_uuid, hour);
    `);

    /**
     * CALC EVENTS BY DAY TABLE:
     */
    pgm.createTable('calc_events_by_day', {
        'event_count': { type: 'INT', notNull: true },
        'event_type': { type: 'VARCHAR(128)', notNull: true },
        'calculator_uuid': { type: 'UUID', notNull: true },
        'day': { type: 'DATE', notNull: true }
    });

    pgm.sql(`
        ALTER TABLE calc_events_by_day ADD PRIMARY KEY (event_type, calculator_uuid, day);
    `);

    /**
     * CLIENT CALC EVENTS BY HOUR TABLE:
     */
    pgm.createTable('client_calc_events_by_hour', {
        'event_count': { type: 'INT', notNull: true },
        'event_type': { type: 'VARCHAR(128)', notNull: true },
        'client_uuid': { type: 'UUID', notNull: true },
        'hour': { type: 'TIMESTAMP', notNull: true }
    });

    pgm.sql(`
        ALTER TABLE client_calc_events_by_hour ADD PRIMARY KEY (event_type, client_uuid, hour);
    `);

    /**
     * CLIENT CALC EVENTS BY DAY TABLE:
     */
    pgm.createTable('client_calc_events_by_day', {
        'event_count': { type: 'INT', notNull: true },
        'event_type': { type: 'VARCHAR(128)', notNull: true },
        'client_uuid': { type: 'UUID', notNull: true },
        'day': { type: 'DATE', notNull: true }
    });

    pgm.sql(`
        ALTER TABLE client_calc_events_by_day ADD PRIMARY KEY (event_type, client_uuid, day);
    `);
    
    pgm.sql(calculator_event_functions);
}

exports.down = (pgm) => {
    pgm.sql('DROP FUNCTION push_calc_event(UUID, UUID, UUID, UUID, VARCHAR(128), JSON);');
    pgm.sql('DROP FUNCTION rollup_calculator_events();');
    pgm.dropTable('calc_events_by_hour');
    pgm.dropTable('calc_events_by_day');
    pgm.dropTable('client_calc_events_by_hour');
    pgm.dropTable('client_calc_events_by_day');
    pgm.dropTable('calc_events');
    // #TODO: remember down migrations for queue stuff.:
    // pgm.dropTable('calc_events_queue');
    // pgm.sql('DROP FUNCTION queue_calc_event_for_processing();');
};