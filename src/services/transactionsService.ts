import db from '../db/db';
import { User } from '../models/user';
import { Transaction } from '../models/transaction';

export class TransactionService{
  public async addFunds(fromUserId: number, amount: number) {

  }

  public async withdrawFunds(fromUserId: number, amount: number) {

  }

  public async getTransactions() {
    const transactions = await db<Transaction>('transactions').select('*');
    return transactions;
}

  
  public async transferFunds(senderId: number, receiverId: number, amount: number) {

    try {
      await db.transaction(async trx => {
        // Lock the sender's row for update
        const sender = await trx('users')
          .where('id', senderId)
          .select('id', 'account_balance')
          .forUpdate()
          .first();
  
        if (!sender) {
          throw new Error('Invalid sender account');
        }

        if (sender.account_balance < amount) {
          throw new Error('Insufficient balance');
        }
  
        // Lock the receiver's row for update
        const receiver = await trx('users')
          .where('id', receiverId)
          .select('id', 'account_balance')
          .forUpdate()
          .first();
  
        if (!receiver) {
          throw new Error('Invalid receiver account');
        }

        // Debit sender's account
        await trx('users').where('id', senderId).decrement('account_balance', amount);

        // Credit receiver's account
        await trx('users').where('id', receiverId).increment('account_balance', amount);
  
        // log the transaction (for audit purposes)
        await trx('transactions').insert({
          user_id: senderId,
          amount,
          transaction_type: 'debit',
          created_at: new Date(),
        });

        await trx('transactions').insert({
          user_id: receiverId,
          amount,
          transaction_type: 'credit',
          created_at: new Date(),
        });


      });
    } catch (error) {
      throw error;
    }

  }

  
}