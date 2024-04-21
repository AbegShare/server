// import type { Knex } from knex;
// Update with your config settings.
const config = {
    development: {
        client: "mysql2",
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'your_database_user',
            password: 'your_database_password',
            database: 'myapp_test',
        },
    },
    staging: {
        client: "mysql2",
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'your_database_user',
            password: 'your_database_password',
            database: 'myapp_test',
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
        client: "mysql2",
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'your_database_user',
            password: 'your_database_password',
            database: 'myapp_test',
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
export default config;
