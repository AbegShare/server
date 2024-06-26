const { table } = require("console");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('user', table => {
        table.specificType('id', 'char(36) primary key');
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('phone_number', 32).notNullable().unique();
        table.string('role', 32).notNullable();
        table.boolean('verified').defaultTo(0);
        table.string('avatar_url');
        table.string('referral_code', 6).notNullable().unique();
        table.boolean('user_disabled').defaultTo(0);
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('modified_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('last_active_at').notNullable().defaultTo(knex.fn.now())
        table.string('default_account_id', 36).notNullable().references('id').inTable('account').onDelete('cascade')

    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('user')
};
