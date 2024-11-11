// src/db/seeds/{timestamp}_seed_users.ts
import { Knex } from 'knex';

export const seed = async (knex: Knex): Promise<void> => {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    { name: 'Alice Doe', email: 'alice@example.com', bvn: '31234567890', activated: 1, account_balance: 100 },
    { name: 'Bob Doe', email: 'bob@example.com', bvn: '41234567890', activated: 1, account_balance: 100 },
    {
      name: 'Ado John Sule',
      phone_number: '07062569817',
      email: 'Ado@lendsqr.com',
      bvn: '21234567890',
      bvn_phone_number: '08012345678',
      date_of_birth: '1990-09-10',
      age: 26,
      gender: 'Female',
      account_number: 'IDR000047197',
      account_balance: 1144.25,
      activated: 1,
      activated_on: '2021-02-01T10:15:08.000Z',
      blacklisted: 0
  }
  ]);
};