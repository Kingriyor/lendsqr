import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.unique(['bvn']); // Adds a unique constraint to the 'bvn' column
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('users', (table) => {
        table.dropUnique(['bvn']); // Removes the unique constraint from the 'bvn' column
      });
}

