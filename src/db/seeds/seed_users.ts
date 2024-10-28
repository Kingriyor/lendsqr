// src/db/seeds/{timestamp}_seed_users.ts
import { Knex } from 'knex';

export const seed = async (knex: Knex): Promise<void> => {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' },
  ]);
};