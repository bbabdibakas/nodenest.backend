import {CreateUserDTO} from "../dtos/UserDTO";
import {TokenService} from "./tokenService";
import {PrismaClient} from "@prisma/client";
import {UserEntity} from "../entities/UserEntity";
import bcrypt from "bcrypt";
import {userEntityToDTO} from "../utils/userEntityToDTO";

const prisma = new PrismaClient();
const tokenService = new TokenService();

export class UserService {
    async createUser(data: CreateUserDTO) {
        const hashPassword = await bcrypt.hash(data.password, 12);
        const user: UserEntity = await prisma.user.create({
            data: {
                ...data,
                password: hashPassword
            }
        })

        const userDTO = userEntityToDTO(user)
        const tokens = await tokenService.generateToken(userDTO)
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)

        return {userDTO, tokens}
    }

    async getUsers() {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                createdAt: true,
                updatedAt: true,
            }
        })
    }
}