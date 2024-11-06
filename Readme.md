1) generate a migration file
- knex migrate:make create_users_table --knexfile src/db/knexfile.ts --env development

2) populate the migration file

3) run migration
- knex migrate:latest --knexfile src/db/knexfile.ts --env development




To set up a database in a TypeScript app using Knex.js, you can follow these steps:

1. Install Knex and Database Client

	•	Install knex and the database client you need (e.g., pg for PostgreSQL, mysql for MySQL, or sqlite3 for SQLite):

``` npm install knex ```
``` npm install pg # or another client, like mysql or sqlite3 ```


	•	Also, install the type definitions for Knex and your database client:

``` npm install --save-dev @types/knex ```



2. Configure Knex

	•	Create a Knex configuration file to manage your database connections. This file typically lives at the root of your project in a file named knexfile.ts or src/knexfile.ts if you’re following a structured folder setup.

// src/knexfile.ts
import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg', // or 'mysql', 'sqlite3', etc.
    connection: {
      host: '127.0.0.1',
      user: 'your_database_user',
      password: 'your_database_password',
      database: 'your_database_name'
    },
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './src/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL, // Use environment variable for production
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './src/seeds'
    }
  }
};

export default config;

3. Initialize Knex in the Application

	•	Create a file to initialize Knex with the configuration, typically db.ts or src/db.ts.

// src/db.ts
import Knex from 'knex';
import knexConfig from './knexfile';

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

const db = Knex(config);

export default db;

4. Create Migration Files

	•	Use Knex CLI commands to create migration files for defining your database schema.
	•	First, install the Knex CLI globally if you haven’t already:

``` npm install -g knex```


	•	Then, use the CLI to create a new migration:

``` knex migrate:make create_users_table --knexfile src/knexfile.ts --env development ```


	•	A migration file will be created in the migrations directory. Open the file and define the table schema:


// src/migrations/{timestamp}_create_users_table.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('users');
}



5. Run Migrations

	•	Run the migrations using the Knex CLI to create your tables:

``` knex migrate:latest --knexfile src/knexfile.ts --env development ```



6. Use Knex in Your Application

	•	Now, you can use db (exported from db.ts) in your application to query the database.

// src/controllers/userController.ts
import db from '../db';

export async function getUsers() {
  return await db('users').select('*');
}

export async function createUser(name: string, email: string) {
  return await db('users').insert({ name, email });
}

7. Typing Knex Queries (Optional)

	•	If you’d like to add TypeScript types for your Knex queries, you can define interfaces for your tables:

interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export async function getUsers(): Promise<User[]> {
  return await db<User>('users').select('*');
}


8. Running Seeds (Optional)

Seeds are used to populate your database with sample data. Here’s how to create and run seed files using Knex.

Step 1: Create a Seed File

You can create a seed file using the Knex CLI. For example, to create a seed for users:

``` knex seed:make seed_users --knexfile src/db/knexfile.ts --env development ```

This command will create a new seed file in the src/seeds directory. The file will have a timestamp in its name.

Step 2: Populate the Seed File

Open the newly created seed file (e.g., src/seeds/{timestamp}_seed_users.ts) and define the data to insert:

// src/seeds/{timestamp}_seed_users.ts
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

This file first deletes any existing entries in the users table and then inserts two new users.

Step 3: Run the Seed File

To run the seeds and populate your database, use the following command:

``` knex seed:run --knexfile src/db/knexfile.ts --env development ```

9. Using Transactions (Optional)

If you need to perform multiple database operations that should be treated as a single unit (i.e., all succeed or all fail), you can use transactions in Knex.

import db from '../db';

async function transferFunds(senderUserId: number, receiverUserId: number, amount: number) {
  const trx = await db.transaction();

  try {
    // Deduct amount from sender
    await trx('users').where('id', senderUserId).decrement('balance', amount);

    // Add amount to receiver
    await trx('users').where('id', receiverUserId).increment('balance', amount);

    // Commit the transaction
    await trx.commit();
  } catch (error) {
    // Rollback the transaction on error
    await trx.rollback();
    throw error;
  }
}

10. Adding Unit Tests for Knex Queries

You can test your database queries and migrations using a testing framework like Jest. Here’s an example of how to set up a basic test for your Knex database interactions.

Step 1: Install Testing Libraries

If you haven’t already, install Jest and any additional testing libraries you need:

``` npm install --save-dev jest ts-jest @types/jest ```

Step 2: Configure Jest

Create a Jest configuration file jest.config.js:

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/setupTests.ts'],
};

Step 3: Set Up the Test Environment

You may want to create a test database and configure your tests to use it. Create a setupTests.ts file:

import db from './db';

beforeAll(async () => {
  // Set up the test database
  await db.migrate.latest(); // Run migrations for the test database
});

afterAll(async () => {
  // Clean up
  await db.destroy(); // Close the database connection
});

Step 4: Write a Unit Test

Create a test file for your users, e.g., src/__tests__/userController.test.ts:

import { createUser, getUsers } from '../controllers/userController';
import db from '../db';

describe('User Controller', () => {
  beforeEach(async () => {
    await db('users').del(); // Clear users before each test
  });

  it('should create a user and retrieve it', async () => {
    await createUser('Alice', 'alice@example.com');
    const users = await getUsers();

    expect(users.length).toBe(1);
    expect(users[0].name).toBe('Alice');
  });
});

Step 5: Run Your Tests

You can now run your tests using the Jest command:

``` npx jest ```



### Working Assumptions
1) One currency
2) User's BVN validation and other KYC is handled
