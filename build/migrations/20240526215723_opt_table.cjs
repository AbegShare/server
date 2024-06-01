/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
    return await knex.schema.createTable('otp', function (table) {
        table.specificType('id', 'char(36) primary key');
        table.string('otp_code', 5).notNullable().unique(); // OTP as a string of 5 characters
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now()); // created_at with the current timestamp
        table.timestamp('expires_at').notNullable() // expires_at with current timestamp + 24 hours
        table.string('user_id', 36).notNullable().references('id').inTable('user').onDelete('cascade')
    }).then(() => knex.raw(`
      CREATE TRIGGER set_expires_at
      BEFORE INSERT ON otp
      FOR EACH ROW
      SET NEW.expires_at = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 24 HOUR);
    `))
};



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.raw(`DROP TRIGGER IF EXISTS set_expires_at`);
    await knex.schema.dropTable('OTP');
};
