// src/routes/userRoutes.ts

import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();
let userController = new UserController();

// Define the endpoint to get users
router.get('/users', authenticateToken, userController.getUsers);


export default router;