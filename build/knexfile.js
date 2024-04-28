import 'dotenv/config';
// Update with your config settings.
const config = {
    development: {
        client: process.env.DB_CLIENT,
        connection: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
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
