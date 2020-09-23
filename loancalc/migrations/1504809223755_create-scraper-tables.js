exports.up = (pgm) => {
    pgm.createTable('scrapers', {
        'uuid': { type: 'UUID', unique: true, primaryKey: true, notNull: true },
        'source': { type: 'TEXT' },
        'private': { type: 'BOOLEAN' },
        'created': { type: 'TIMESTAMPTZ', notNull: true },
        'modified': { type: 'TIMESTAMPTZ', notNull: true },
    });

    pgm.createTable('scrapers_access', {
        'client_uuid': { type: 'UUID', notNull: true, references: 'clients(uuid)', onDelete: 'CASCADE' },
        'scraper_uuid': { type: 'UUID', notNull: true, references: 'scrapers(uuid)', onDelete: 'CASCADE' }
    });

    pgm.createTable('scraper_connections', {
        'calculator_uuid': { type: 'UUID', notNull: true, references: 'calculators(uuid)', onDelete: 'CASCADE' },
        'scraper_uuid': { type: 'UUID', notNull: true, references: 'scrapers(uuid)', onDelete: 'CASCADE' }
    })

    pgm.addColumns('calculators', { 'last_scrape': { type: 'TIMESTAMPTZ' } });

    // Defaults:
    pgm.alterColumn('scrapers', 'uuid', { 'default': pgm.func("uuid_generate_v4()") });
    pgm.alterColumn('scrapers', 'created', { 'default': pgm.func("now()") });
    pgm.alterColumn('scrapers', 'modified', { 'default': pgm.func("now()") });

    // Creates the modified trigger:
    pgm.sql(`
        CREATE TRIGGER update_scrapers_modified
            BEFORE UPDATE ON scrapers
            FOR EACH ROW
            EXECUTE PROCEDURE update_modified_column();
    `);
};

exports.down = (pgm) => {
    pgm.dropColumns('calculators', ['last_scrape']);
    pgm.dropTable('scraper_connections');
    pgm.dropTable('scrapers_access');
    pgm.dropTable('scrapers');
};
