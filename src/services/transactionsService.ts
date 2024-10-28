import db from '../db/db';

async function addFunds(fromUserId: number, amount: number) {

}

async function withdrawFunds(fromUserId: number, amount: number) {

}

async function transferFunds(fromUserId: number, toUserId: number, amount: number) {
  const trx = await db.transaction();

  try {
    // Deduct amount from sender
    await trx('users').where('id', fromUserId).decrement('balance', amount);

    // Add amount to receiver
    await trx('users').where('id', toUserId).increment('balance', amount);

    // Commit the transaction
    await trx.commit();
  } catch (error) {
    // Rollback the transaction on error
    await trx.rollback();
    throw error;
  }
}