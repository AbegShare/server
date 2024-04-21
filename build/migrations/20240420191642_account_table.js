/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('account', table => {
        table.specificType('id', 'char(36) primary key');
        table.string('account_type', 32);
        table.string('account_name', 32).notNullable();
        table.string('account_plan', 32);
        table.string('payment_type', 32);
        table.string('payment_customer_id', 64);
        table.string('payment_subscription_id', 64);
        table.string('payment_method_id', 64);
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('modified_at').notNullable().defaultTo(knex.fn.now())
        table.timestamp('last_active_at').defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('account')
};
