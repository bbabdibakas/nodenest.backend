import {IUserRepository} from "../../core/interfaces/IUserRepository";
import {User} from "../../core/entities/User";
import bcrypt from "bcrypt";
import {TokenService} from "./TokenService";

export class UserService {
    constructor(
        private userRepository: IUserRepository,
        private tokenService: TokenService,
    ) {
    }

    async createUser(name: string, username: string, password: string) {
        const hashPassword = await bcrypt.hash(password, 12);

        const candidateUser = new User(0, name, username, hashPassword, new Date(), new Date())
        const user = await this.userRepository.createUser(candidateUser);

        const payload = this.getPayload(user);

        const {accessToken, refreshToken} = this.tokenService.generateTokens(payload)
        await this.tokenService.saveToken(refreshToken, user.id);

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return this.userRepository.getUserByUsername(username);
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.getUsers();
    }

    getPayload(user: User) {
        const {password, ...payload} = user;
        return payload;
    }
}
