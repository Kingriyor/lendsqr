import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('users', (table) => {
    table.dropColumn('org_id');
    table.dropColumn('organization');
    table.dropColumn('account_name');  
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('users', (table) => {
    table.string('org_id').nullable();
    table.string('organization').nullable();
    table.string('account_name').nullable();
  });
}