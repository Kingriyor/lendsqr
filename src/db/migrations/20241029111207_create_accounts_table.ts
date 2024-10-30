// migrations/20241028000000_create_accounts.ts

import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('accounts', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.string('account_number', 20).unique().notNullable();
        table.enu('account_type', ['savings', 'checking']).notNullable();
        table.decimal('balance', 15, 2).defaultTo(0.00).notNullable();
        table.string('currency', 3).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.boolean('is_active').defaultTo(true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('accounts');
}