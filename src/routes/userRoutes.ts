// src/routes/userRoutes.ts

import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
let userController = new UserController();

// Define the endpoint to get users
router.get('/users', authenticateToken, userController.getUsers);

// Define the endpoint to get transactions
router.get('/transactions', authenticateToken, userController.getTransactions);

// Create a new user
router.post('/users', authenticateToken, userController.createUser);

// Retrieve a single user by ID
router.get('/users/:id', authenticateToken, userController.getUserById);

// Update a user by ID
router.put('/users/:id', authenticateToken, userController.updateUser);

// Delete a user by ID
router.delete('/users/:id', authenticateToken, userController.deleteUser);

// transfer funds
router.post('/users/transfer', authenticateToken, userController.transferFunds);


export default router;