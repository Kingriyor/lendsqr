// // import { createUser, getUsers } from '../controllers/userController';
// import db from '../db/db';
// import { getMockReq, getMockRes } from '@jest-mock/express'
// import { UserController } from '../controllers/userController';

// let userController = new UserController();

// describe('User Controller', () => {
//   beforeEach(async () => {
//     await db('users').del(); // Clear users before each test
//   });

//   it('should create a user and retrieve it', async () => {
//     await userController.createUser('Alice', 'alice@example.com');
//     const users = await userController.getUsers(getMockReq());

//     console.log("-----------2-------------");

//     console.log(users);

//     // expect(users.length).toBe(1);
//     // expect(users[0].name).toBe('Alice');
//   });
// });


test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});