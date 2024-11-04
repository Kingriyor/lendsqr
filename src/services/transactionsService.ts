import db from '../db/db';
import { User } from '../models/user';
import { Transaction } from '../models/transaction';

export class TransactionService{
  public async depositFunds(userId: number, amount: number) {
    // TODO
    try {
      await db.transaction(async trx => {
  
        // Lock the depositer's row for update
        const depositer = await trx('users')
          .where('id', userId)
          .select('id', 'account_balance', 'bvn')
          .forUpdate()
          .first();
  
        if (!depositer) {
          throw new Error('Invalid depositer account');
        }

        if (!depositer.bvn || depositer.bvn == ""){
          throw new Error('Invalid depositer account BVN');
        }

        // Credit depositer's account
        await trx<User>('users').where('id', userId).increment('account_balance', amount);
  
        // log the transaction (for audit purposes)

        await trx('transactions').insert({
          user_id: userId,
          amount,
          transaction_type: 'credit',
          metadata: JSON.stringify({ description: 'Deposit', details: { userId } }),
          created_at: new Date(),
        });


      });
    } catch (error) {
      throw error;
    }
  }

  public async withdrawFunds(userId: number, amount: number) {
    // TODO
    try {
      await db.transaction(async trx => {
        // Lock the withdrawer's row for update
        const withdrawer = await trx('users')
          .where('id', userId)
          .select('id', 'account_balance', 'bvn')
          .forUpdate()
          .first();
  
        if (!withdrawer) {
          throw new Error('Invalid withdrawer account');
        }

        if (!withdrawer.bvn || withdrawer.bvn == ""){
          throw new Error('Invalid withdrawer account BVN');
        }

        if (withdrawer.account_balance < amount) {
          throw new Error('Insufficient balance');
        }
  
        // Debit withdrawer's account
        await trx('users').where('id', userId).decrement('account_balance', amount);

        // log the transaction (for audit purposes)
        await trx('transactions').insert({
          user_id: userId,
          amount,
          transaction_type: 'debit',
          metadata: JSON.stringify({ description: 'Withdrawal', details: { userId } }),
          created_at: new Date(),
        });


      });
    } catch (error) {
      throw error;
    }
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
          .select('id', 'account_balance', 'bvn')
          .forUpdate()
          .first();
  
        if (!sender) {
          throw new Error('Invalid sender account');
        }

        if (!sender.bvn || sender.bvn == ""){
          throw new Error('Invalid sender account BVN');
        }

        if (sender.account_balance < amount) {
          throw new Error('Insufficient balance');
        }
  
        // Lock the receiver's row for update
        const receiver = await trx('users')
          .where('id', receiverId)
          .select('id', 'account_balance', 'bvn')
          .forUpdate()
          .first();
  
        if (!receiver) {
          throw new Error('Invalid receiver account');
        }

        if (!receiver.bvn || receiver.bvn == ""){
          throw new Error('Invalid receiver account BVN');
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
          metadata: JSON.stringify({ description: 'Transfer', details: { senderId,  receiverId} }),
          created_at: new Date(),
        });

        await trx('transactions').insert({
          user_id: receiverId,
          amount,
          transaction_type: 'credit',
          metadata: JSON.stringify({ description: 'Transfer', details: { senderId,  receiverId} }),
          created_at: new Date(),
        });

      });
    } catch (error) {
      throw error;
    }

  }

  
}