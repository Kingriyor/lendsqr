// src/controllers/userController.ts

import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { TransactionService } from '../services/transactionsService';
import { ApiResponse } from '../models/ApiResponse';

const userService = new UserService();
const transactionsService = new TransactionService();

// TODO validate endpoint inputs

export class UserController{

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      await userService.createUser(name, email);

      const response: ApiResponse<null> = {
        success: true,
        message: 'User Created',
        data: null,
        error: ""
      };
      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Failed to create user',
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(response);
    }
  }

  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getUsers(); // Fetch all users
      const response: ApiResponse<typeof users> = {
        success: true,
        message: 'Users fetched',
        data: users,
        error: ""
      };
      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching users:', error);
      const response: ApiResponse<null> = {
        success: false,
        message: 'Failed to fetch users',
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(response);
    }
  }

  public async getTransactions(req: Request, res: Response): Promise<void>{
    try {
      const transactions = await transactionsService.getTransactions(); // Fetch all
      const response: ApiResponse<typeof transactions> = {
        success: true,
        message: 'Transactions fetched',
        data: transactions,
        error: ""
      };
      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      const response: ApiResponse<null> = {
        success: false,
        message: 'Failed to fetch transactions',
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(response);
    }
  }

  public async getUserById (req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    try {
        const user = await userService.getUserById(parseInt(id));
        if (!user) {
            const response: ApiResponse<null> = {
              success: false,
              message: 'User not found',
              data: null,
              error: "",
            };
            res.status(404).json(response);
        }else{
          const response: ApiResponse<typeof user> = {
            success: true,
            message: 'User fetched',
            data: user,
            error: ""
          };
          res.status(200).json(response);
        }
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Failed to fetch User',
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(response);
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    const updates = req.body;
    try {
        const [updatedUser] = await userService.updateUser(parseInt(id), updates);
        if (!updatedUser) {
            const response: ApiResponse<null> = {
              success: false,
              message: 'User not found',
              data: null,
              error: "",
            };
            res.status(404).json(response);
        }else{
          const response: ApiResponse<typeof updatedUser> = {
            success: true,
            message: 'User Updated',
            data: updatedUser,
            error: ""
          };
          res.status(200).json(response);
        }  
    } catch (error) {
        const response: ApiResponse<null> = {
          success: false,
          message: 'Error updating user',
          data: null,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
        res.status(500).json(response);
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    try {
        const deleted = await userService.deleteUser(parseInt(id));
        if (!deleted) {
            const response: ApiResponse<null> = {
              success: false,
              message: 'User not found',
              data: null,
              error: "",
            };
            res.status(404).json(response);
        }else{
          const response: ApiResponse<null> = {
            success: true,
            message: 'User Deleted',
            data: null,
            error: ""
          };
          res.status(200).json(response);
        }
    } catch (error) {
        const response: ApiResponse<null> = {
          success: false,
          message: 'Error deleting user',
          data: null,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
        res.status(500).json(response);
    }
  }

  public async transferFunds(req: Request, res: Response): Promise<void> {
    try {
      const { fromUserId, toUserId, amount } = req.body;
      if (!fromUserId || !toUserId || !amount || amount <= 0) {
        const response: ApiResponse<null> = {
          success: false,
          message: 'Invalid input',
          data: null,
          error: "",
        };
        res.status(400).json(response);
      }else{
        const feedback = await transactionsService.transferFunds(fromUserId, toUserId, amount);

        const response: ApiResponse<typeof feedback> = {
          success: true,
          message: 'Transfer Successful',
          data: feedback,
          error: ""
        };
        res.status(201).json(response);
      }
    }
    catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        message: 'Error Transfering funds',
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      res.status(500).json(response);
    }
  }

}
