import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions', (table) => {
        table.increments('id').primary();
        table.decimal('amount', 14, 2).notNullable();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.enum('transaction_type', ['debit', 'credit']).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('transactions');
}


