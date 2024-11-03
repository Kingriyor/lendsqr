import db from '../db/db';
import { User } from '../models/user';


export class UserService{
    public async createUser(name: string, email: string) {
        return await db<User>('users').insert({ name, email });
    }

    public async getUsers() {
        const users = await db<User>('users').select('*');
        return users;
    }

    
    public async getUserById(id: number) {
        const user = await db<User>('users').where({ id }).first();
        return user;
    }

    public async updateUser(id: number, updates: any) {
        const user =await db('users').where({ id }).update(updates).returning('*');
        return user;
    }

    public async deleteUser(id: number) {
        const user = await db('users').where({ id }).del();
        return user;
    }
    

}