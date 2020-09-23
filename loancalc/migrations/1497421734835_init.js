/**
 * - Creates the function that is used in triggers for the modified column.
 * - Adds the userrole type.
 */

 /*
  * Don't forget to create extensions
  * CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  */

exports.up = (pgm) => {
    pgm.sql(`
        CREATE OR REPLACE FUNCTION update_modified_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.modified = now();
            RETURN NEW;
        END
        $$ language 'plpgsql';
    `);

    pgm.createType('userrole', ['user', 'admin', 'super']);
};

exports.down = (pgm) => {
    pgm.sql('DROP FUNCTION update_modified_column();');
    pgm.dropType('userrole');
};
