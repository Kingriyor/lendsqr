// src/controllers/userController.ts

import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController{

  public async createUser(name: string, email: string) {
    return await userService.createUser(name, email);
  }

  public async getUsers(req: Request, res: Response){
    try {
      const users = await userService.getUsers(); // Fetch all users
      res.status(200).json(users); // Respond with the users in JSON format
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
