exports.up = (pgm) => {
    pgm.addColumns('clients', {
        'branding_img': { type: 'VARCHAR(53)', references: 'db_files(filename)' },
    });
};

exports.down = (pgm) => {
    pgm.dropColumns('clients', ['branding_img']);
};
