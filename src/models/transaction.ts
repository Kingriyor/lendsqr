export interface Transaction {
    id: number; 
    amount: number;
    user_id: number;
    transactionType: 'debit' | 'credit';
    createdAt: Date; 
}