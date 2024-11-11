Lendsqr Wallet

A backend service for a mobile lending app, providing essential wallet functionalities. The application is developed in Node.js with TypeScript and offers various financial transactions, including account creation, funding, transfers, withdrawals, and blacklist checks to prevent certain users from onboarding.

Table of Contents

	•	Features
	•	Architecture
	•	Technologies Used
	•	Installation
	•	Environment Setup
	•	Routes
	•	Usage
	•	Testing
	•	Technologies Used
	•	Contributing
    •	TODOs

Features

	•	Account Creation: Users can create accounts with unique identifiers.
	•	Account Funding: Users can fund their accounts.
	•	Transfers: Allows users to transfer funds to other accounts.
	•	Withdrawals: Supports withdrawals from user accounts.
	•	Blacklist Checking: Blocks users on the Lendsqr Adjutor Karma blacklist from onboarding.
	•	Authentication: Token-based authentication for secured endpoints.
	•	Error Handling: Proper error responses for various scenarios.

Architecture

The app follows a layered architecture that includes:

	1.	Controller Layer: Manages request handling and responses.
	2.	Service Layer: Contains business logic and transaction handling.
	3.	Database Layer: Uses Knex.js for SQL queries.

Technologies Used

	•	Node.js and TypeScript for backend development
	•	Express.js for building APIs
	•	Knex.js for query building and database operations
	•	Jest for testing
	•	PostgreSQL as the database
	•	Adjutor Karma API for blacklist checks
	•	JWT for authentication

Installation

	1.	Clone this repository:

git clone https://github.com/yourusername/lendsqr_wallet.git
cd lendsqr_wallet


	2.	Install dependencies:

npm install


	3.	Configure environment variables by creating a .env file based on .env.example:

PORT=4000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
ADJUTOR_KARMA_API_KEY=your_adjutor_api_key


	4.	Set up the database by running migrations:

npm run migrate


	5.	Seed the database if required:

npm run seed


	6.	Start the development server:

npm run dev


Environment Setup

Create a .env file in the root directory and configure the following environment variables:

PORT=5000
JWT_SECRET=<your_jwt_secret>

MYSQLDB_USER=<root>
MYSQLDB_ROOT_PASSWORD=<abc123456>
MYSQLDB_DATABASE=<lendsqr_db>
MYSQLDB_LOCAL_PORT=<db_port>

DATABASE_URL=<your_database_url>

NODE_LOCAL_PORT=<port>
NODE_DOCKER_PORT=<port>
JWT_TOKEN_SALT=<secret_salt>

DB_HOST=<127.0.0.1>
DB_USER=<your_database_user>
DB_PASSWORD=<your_database_password>
DB_NAME=<db_name>


Routes

Here are the primary endpoints available in this API:

User Routes

	•	GET /users: Fetch all users (requires authentication).
	•	POST /users: Register a new user, with request validation (requires authentication).
	•	GET /users/:id: Retrieve user details by ID (requires authentication).
	•	PUT /users/:id: Update user information by ID, with validation (requires authentication).
	•	DELETE /users/:id: Remove a user by ID (requires authentication).

Transaction Routes

	•	GET /transactions: Retrieve transaction history (requires authentication).
	•	POST /users/transfer: Transfer funds to another user, with validation (requires authentication).
	•	POST /users/withdraw: Withdraw funds from user account, with validation (requires authentication).
	•	POST /users/deposit: Deposit funds to user account, with validation (requires authentication).

Middleware

	•	Authentication: authenticateToken verifies user identity via JWT.
	•	Validation: validateRequestBody applies schema validation using Joi for request body integrity.


Usage

Once the server is running, you can use tools like Postman or cURL to interact with the API. Ensure that the token-based authentication is applied to secured endpoints.

NB - Bearer token : fauxSecret123

Sample Request

curl -X POST http://localhost:4000/api/account -H "Authorization: Bearer <fauxSecret123>" -d '{
  "amount": 1000
}'


Testing

To run tests:

npm run test

Tests are written using Jest and include unit tests for controllers and services.

Technologies Used

	•	Node.js and Express: Backend server framework.
	•	TypeScript: Strongly typed language for enhanced development.
	•	Knex: SQL query builder for database operations.
	•	Joi: Request validation middleware.
	•	JWT: Authentication.

Contributing

	1.	Fork the repository.
	2.	Create a new feature branch (git checkout -b feature-name).
	3.	Commit your changes (git commit -m 'Add new feature').
	4.	Push to the branch (git push origin feature-name).
	5.	Open a Pull Request.


TODOs
- names should be diviided into first, middle and Surname
- A user with records in the Lendsqr Adjutor Karma blacklist should never be onboarded
- Debug and complete tests
- E-R Diagram
- add postman collection

Working Assumptions
- One currency
- User BVN verification and Other KYC is handled