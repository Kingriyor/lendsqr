// src/controllers/userController.ts

import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { TransactionService } from '../services/transactionsService';

const userService = new UserService();
const transactionsService = new TransactionService();

export class UserController{

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      const [id] = await userService.createUser(name, email);
      res.status(201).json({ success: true, data: { id } });
    } catch (error) {
      res.status(500).json({ success: false, message:'Error creating user', error });
    }
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

  public async getTransactions(req: Request, res: Response){
    try {
      const transactions = await transactionsService.getTransactions(); // Fetch all users
      res.status(200).json(transactions); // Respond with the users in JSON format
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getUserById (req: Request, res: Response): Promise<void>{
    const { id } = req.params;

    try {
        const user = await userService.getUserById(parseInt(id));
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
        }else{
          res.json({ success: true, data: user });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    const updates = req.body;
    try {
        const [updatedUser] = await userService.updateUser(parseInt(id), updates);
        if (!updatedUser) {
            res.status(404).json({ success: false, message: 'User not found' });
        }else{
          res.json({ success: true, data: updatedUser });
        }  
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating user', error });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    try {
        const deleted = await userService.deleteUser(parseInt(id));
        if (!deleted) {
            res.status(404).json({ success: false, message: 'User not found' });
        }else{
          res.json({ success: true, message: 'User deleted successfully' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting user', error });
    }
  }

  public async transferFunds(req: Request, res: Response): Promise<void> {
    try {
      const { fromUserId, toUserId, amount } = req.body;
      if (!fromUserId || !toUserId || !amount || amount <= 0) {
        res.status(400).json({ error: 'Invalid input' });
      }else{
        const feedback = await transactionsService.transferFunds(fromUserId, toUserId, amount);
        res.status(201).json({ success: true, data: { feedback } });
      }
    }
    catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        res.status(500).json({ success: false, error: 'Error Transfering funds', details: error.message });
      } else {
        console.log('An unknown error occurred');
        res.status(500).json({ success: false, error: 'Error Transfering funds', details: 'An unknown error occurred' });
      }
    }
  }


// public async transferFunds(req: Request, res: Response): Promise<void> {
//   const { senderId, receiverId, amount } = req.body;

//   try {
//     // Validate input
//     if (!senderId || !receiverId || amount <= 0) {
//       res.status(400).json({ error: 'Invalid input' });
//     }

//     await db.transaction(async trx => {
//       // Lock the sender's row for update
//       const sender = await trx('users')
//         .where('id', senderId)
//         .select('id', 'account_balance')
//         .forUpdate()
//         .first();

//       if (!sender || sender.account_balance < amount) {
//         throw new Error('Insufficient balance or invalid sender account');
//       }

//       // Lock the receiver's row for update
//       const receiver = await trx('users')
//         .where('id', receiverId)
//         .select('id', 'account_balance')
//         .forUpdate()
//         .first();

//       if (!receiver) {
//         throw new Error('Invalid receiver account');
//       }

//       // Debit sender's account
//       await trx('users')
//         .where('id', senderId)
//         .update({
//           account_balance: sender.account_balance - amount,
//         });

//       // Credit receiver's account
//       await trx('users')
//         .where('id', receiverId)
//         .update({
//           account_balance: receiver.account_balance + amount,
//         });

//       // Optionally log the transaction (for audit purposes)
//       await trx('transactions').insert({
//         sender_id: senderId,
//         receiver_id: receiverId,
//         amount,
//         transaction_type: 'transfer',
//         created_at: new Date(),
//       });
//     });

//     res.status(200).json({ success: true, message: 'Transfer completed successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Transfer failed', details: error.message });
//   }
// };

}
