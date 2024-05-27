import 'dotenv/config';
// Update with your config settings.
const config = {
    development: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            port: 4000,
            user: 'root',
            password: 'root',
            database: 'abegtest',
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
        client: 'nill',
        connection: {
            host: 'nill',
            port: 0,
            user: 'nill',
            password: 'nill',
            database: 'nill',
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
