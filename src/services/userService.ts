import {CreateUserDTO} from "../dtos/UserDTO";
import {TokenService} from "./tokenService";
import {PrismaClient} from "@prisma/client";
import {UserEntity} from "../entities/UserEntity";
import bcrypt from "bcrypt";

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

        const {password, ...userWithoutPassword} = user;

        const tokens = await tokenService.generateToken(userWithoutPassword)
        const {accessToken, refreshToken} = tokens

        console.log({user, accessToken, refreshToken})

        return {user, tokens}
    }

    async getUsers() {
        return prisma.user.findMany()
    }
}