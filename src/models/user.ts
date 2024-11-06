export interface User {
    id: number;
    name: string;
    phone_number: string;
    email: string;
    bvn: string;
    bvn_phone_number: string;
    date_of_birth: string;
    age: number;
    gender: string;
    account_number: string;
    account_balance: number;
    activated: number;
    activated_on: string;
    blacklisted: number;
    created_on: string;
    modified_on: string;
    created_at: Date;
    updated_at: Date;
}