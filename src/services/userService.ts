import db from '../db/db';

interface User {
    id: number;
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}

export class UserService{
    public async createUser(name: string, email: string) {
        return await db<User>('users').insert({ name, email });
    }

    public async getUsers() {
        const users = await db<User>('users').select('*');
        return users;
    }

}