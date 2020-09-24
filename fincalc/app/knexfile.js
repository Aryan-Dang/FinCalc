// Update with your config settings.

module.exports = {
    development: {
        client: "postgresql",
        connection: {
            host: "postgres",
            port: 5432,
            database: "fincalc",
            user:     "fincalc",
            password: "fincalc"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },

    production: {
        client: "postgresql",
        connection: {
            host: "postgres",
            port: 5432,
            database: "fincalc",
            user:     "fincalc",
            password: "fincalc"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }
};
