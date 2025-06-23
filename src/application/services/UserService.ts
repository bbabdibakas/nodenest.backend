import {IUserRepository} from "../../core/interfaces/IUserRepository";
import {User} from "../../core/entities/User";
import bcrypt from "bcrypt";
import {ITokenRepository} from "../../core/interfaces/ITokenRepository";
import {Token} from "../../core/entities/Token";

export class UserService {
    constructor(
        private userRepository: IUserRepository,
    ) {
    }

    async createUser(name: string, username: string, password: string): Promise<User> {
        const hashPassword = await bcrypt.hash(password, 12);

        const candidateUser = new User(0, name, username, hashPassword, new Date(), new Date())
        return this.userRepository.createUser(candidateUser);
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return this.userRepository.getUserByUsername(username);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.getUsers();
    }
}
