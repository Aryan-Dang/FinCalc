exports.up = (pgm) => {
    pgm.sql(`
        ALTER TABLE calculators
            ALTER COLUMN metadata
            SET DATA TYPE jsonb
            USING metadata::jsonb;
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        ALTER TABLE calculators
            ALTER COLUMN metadata
            SET DATA TYPE json
            USING metadata::json;
    `);
};
