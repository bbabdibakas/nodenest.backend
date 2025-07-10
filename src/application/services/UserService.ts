import {IUserRepository, IUserRepositoryToken} from "../../core/interfaces/IUserRepository";
import {User} from "../../core/entities/User";
import bcrypt from "bcrypt";
import {TokenService} from "./TokenService";
import {UserDTO} from "../dtos/UserDTO";
import {inject, injectable} from "tsyringe";
import {CreateUserDTO} from "../dtos/CreateUserDTO";

@injectable()
export class UserService {
    constructor(
        @inject(IUserRepositoryToken) private userRepository: IUserRepository,
        private tokenService: TokenService,
    ) {
    }

    async createUser(userData: CreateUserDTO) {
        const hashPassword = await bcrypt.hash(userData.password, 12);

        const candidateUser = new User(0, userData.name, userData.username, hashPassword, new Date(), new Date())
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

    async getUsers() {
        const users = await this.userRepository.getUsers();
        return users.map((user) => ({
            id: user.id,
            name: user.name,
            username: user.username,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
        }))
    }

    getPayload(user: User): UserDTO {
        const {password, ...payload} = user;
        return payload;
    }
}
