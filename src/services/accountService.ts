import db from '../db/db';

interface Account {
    id: number;
    userId: number;
    accountNumber: string;
    accountType: 'savings' | 'checking';
    balance: number; //in kobo or pennies etc
    currency: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
}

export class AccountService{
    public async createAccount(userId: number, accountType: 'savings' | 'checking') {
        return await db<Account>('accounts').insert({ userId, accountType });
    }

    public async getAccounts() {
        const users = await db<Account>('accounts').select('*');
        return users;
    }

}