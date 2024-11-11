// src/routes/userRoutes.ts

import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';
import { validateRequestBody } from '../middleware/validationRequest';
import { fundWithdrawAccountSchema, transferFundsSchema, createUserSchema, updateUserSchema } from '../models/validationSchemas';

const router = Router();
let userController = new UserController();

// Define the endpoint to get users
router.get('/users', authenticateToken, userController.getUsers);

// Define the endpoint to get transactions
router.get('/transactions', authenticateToken, userController.getTransactions);

// Create a new user
router.post('/users', authenticateToken, validateRequestBody(createUserSchema), userController.createUser);

// Retrieve a single user by ID
router.get('/users/:id', authenticateToken, userController.getUserById);

// Update a user by ID
router.put('/users/:id', authenticateToken, validateRequestBody(updateUserSchema), userController.updateUser);

// Delete a user by ID
router.delete('/users/:id', authenticateToken, userController.deleteUser);

// transfer funds
router.post('/users/transfer', authenticateToken, validateRequestBody(transferFundsSchema), userController.transferFunds);

// withdraw funds
router.post('/users/withdraw', authenticateToken, validateRequestBody(fundWithdrawAccountSchema), userController.withdrawFunds);

// deposit funds
router.post('/users/deposit', authenticateToken, validateRequestBody(fundWithdrawAccountSchema), userController.depositFunds);

export default router;