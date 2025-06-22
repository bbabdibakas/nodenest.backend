import {PrismaClient} from "@prisma/client";
import ApiError from "../exceptions/apiError";
import bcrypt from "bcrypt";
import {TokenService} from "./tokenService";
import {userEntityToDTO} from "../utils/userEntityToDTO";

const prisma = new PrismaClient();
const tokenService = new TokenService();

export class AuthService {
    async login(username: string, password: string) {
        const user = await prisma.user.findUnique({where: {username: username}});
        if (!user) {
            throw ApiError.NotFound("User not found");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw ApiError.BadRequest("Invalid credentials")
        }

        const userDTO = userEntityToDTO(user)

        const tokens = await tokenService.generateToken(userDTO)
        await tokenService.saveToken(userDTO.id, tokens.refreshToken)
        return {userDTO, tokens}
    }
}