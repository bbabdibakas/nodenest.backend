import {User} from "../entities/User";

export interface IUserRepository {
    createUser(user: User): Promise<User>;
    getUserByUsername(username: string): Promise<User | null>;
    getUsers(): Promise<User[]>;
}