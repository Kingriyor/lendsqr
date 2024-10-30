import db from '../db/db';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    full_name: string;
    phone_number: string;
    phone_number_hash: string;
    email: string;
    bvn: string;
    bvn_phone_number: string;
    date_of_birth: string;
    age: number;
    gender: string;
    stage_id: number;
    stage: string;
    photo_url: string;
    mifos_client_id: string;
    client_id: string;
    savings_id: string;
    account_number: string;
    account_balance: number;
    account_name: string;
    referral_code: string;
    referred_by: string | null;
    referrer_name: string | null;
    referrer_email: string | null;
    referrer_phone: string | null;
    referrer_code: string | null;
    device_id: string;
    notification_token: string;
    device_type: string;
    tier_id: number;
    tier: string;
    withdrawal_limit: number;
    deposit_limit: number;
    borrower_max_cumulative_amount: number;
    support_email: string;
    loan_count: number;
    savings_plans: number;
    savings_target: number;
    savings_balance: number;
    activated: number;
    activated_on: string;
    blacklisted: number;
    reason: string | null;
    selfie_bvn_check: string;
    selfie_id_check: string;
    last_login_date: string;
    created_on: string;
    modified_on: string;
    deleted_on: string | null;
    nok_first_name: string;
    nok_last_name: string;
    nok_phone_number: string;
    nok_email: string;
    nok_address: string;
    nok_relationship: string;
    marital_status: string;
    no_of_dependent: string;
    type_of_residence: string;
    educational_attainment: string;
    employment_status: string;
    sector_of_employment: string;
    current_employer: string;
    employment_category: string;
    monthly_net_income: string;
    work_start_date: string;
    work_email: string;
    country: string;
    city: string;
    lga: string;
    street: string | null;
    nearest_landmark: string;
    longitude: number;
    latitude: number;
    address: string;
    process_time: string;
    created_at: Date;
    updated_at: Date;
}

interface ApiResponse {
    success: boolean;
    data: User[];
}

export class UserService{
    public async createUser(full_name: string, email: string) {
        return await db<User>('users').insert({ full_name, email });
    }

    public async getUsers() {
        const users = await db<User>('users').select('*');
        return users;
    }

}