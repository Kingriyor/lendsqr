// src/controllers/__tests__/userController.test.ts

import { Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import { UserService } from '../services/userService';
import { TransactionService } from '../services/transactionsService';

// Mock the services
jest.mock('../services/userService');
jest.mock('../services/transactionsService');
jest.mock('../db/db', () => ({
  __esModule: true,
  default: jest.fn().mockReturnThis(),
}));

const userController = new UserController();
const userService = new UserService();
const transactionsService = new TransactionService();

describe('UserController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      req.body = { name: 'John Doe', email: 'john.doe@example.com' };
      jest.spyOn(userService, 'createUser').mockResolvedValue(req.body);

      await userController.createUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User Created',
        data: req.body,
        error: '',
      });
    });

    it('should return 500 if there is an error', async () => {
      req.body = { name: 'John Doe', email: 'john.doe@example.com' };
      jest.spyOn(userService, 'createUser').mockRejectedValue(new Error('Database error'));

      await userController.createUser(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to create user',
        data: null,
        error: 'Database error',
      });
    });
  });

  describe('getUsers', () => {
    it('should fetch all users successfully', async () => {
      // const mockUsers = [{ /*...mock user data...*/ }];
      const mockUsers = [{
        id: 44633,
        name: "Ado John Sule",
        email: "Ado@lendsqr.com",
        created_at: new Date(),
        updated_at: new Date(),
        phone_number: "07062569817",
        bvn: "21234567890",
        bvn_phone_number: "08012345678",
        date_of_birth: "1990-09-09T23:00:00.000Z",
        age: 26,
        gender: "Female",
        account_number: "IDR000047197",
        account_balance: 1144.25,
        activated: 1,
        activated_on: "2021-02-01T10:15:08.000Z",
        blacklisted: 0,
        created_on: "2021-02-01T11:02:00.000Z",
        modified_on: "2023-10-02T23:20:36.000Z"
    }];

      jest.spyOn(userService, 'getUsers').mockResolvedValue(mockUsers);

      await userController.getUsers(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Users fetched',
        data: mockUsers,
        error: '',
      });
    });

    it('should return 500 if there is an error', async () => {
      jest.spyOn(userService, 'getUsers').mockRejectedValue(new Error('Service error'));

      await userController.getUsers(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to fetch users',
        data: null,
        error: 'Service error',
      });
    });
  });

  describe('getUserById', () => {
    it('should fetch a user by ID successfully', async () => {
      req.params = { id: '43691' };
      // const mockUser = { id: 43691, /*...other user properties...*/ };
      const mockUser = {
        id: 43691,
        name: "Ado John Sule",
        email: "Ado@lendsqr.com",
        created_at: new Date(),
        updated_at: new Date(),
        phone_number: "07062569817",
        bvn: "21234567890",
        bvn_phone_number: "08012345678",
        date_of_birth: "1990-09-09T23:00:00.000Z",
        age: 26,
        gender: "Female",
        account_number: "IDR000047197",
        account_balance: 1144.25,
        activated: 1,
        activated_on: "2021-02-01T10:15:08.000Z",
        blacklisted: 0,
        created_on: "2021-02-01T11:02:00.000Z",
        modified_on: "2023-10-02T23:20:36.000Z"
    };

      jest.spyOn(userService, 'getUserById').mockResolvedValue(mockUser);

      await userController.getUserById(req as Request, res as Response);

      expect(userService.getUserById).toHaveBeenCalledWith('43691');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User fetched',
        data: mockUser,
        error: '',
      });
    });

    it('should return 404 if the user is not found', async () => {
      req.params = { id: '1' };
      jest.spyOn(userService, 'getUserById').mockResolvedValue(undefined);

      await userController.getUserById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found',
        data: null,
        error: '',
      });
    });

    it('should return 500 if there is an error', async () => {
      req.params = { id: '1' };
      jest.spyOn(userService, 'getUserById').mockRejectedValue(new Error('Database error'));

      await userController.getUserById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Failed to fetch user',
        data: null,
        error: 'Database error',
      });
    });
  });

  // Add more tests for updateUser, deleteUser, transferFunds, depositFunds, and withdrawFunds
});