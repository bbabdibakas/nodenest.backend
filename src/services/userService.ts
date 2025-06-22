import {CreateUserDTO, UserDTO} from "../dtos/UserDTO";
import {TokenService} from "./tokenService";

const tokenService = new TokenService();

export class UserService {
    async createUser(data: CreateUserDTO) {
        const user = {
            id: 1,
            name: 'Administrador',
            username: data.username,
            createdAt: new Date(),
        }

        const tokens = tokenService.generateToken(user)

        console.log({user, tokens})

        return {user, tokens}
    }
}