import jwt from 'jsonwebtoken';
import {EnvService} from "./envService";
import {UserDTO} from "../dtos/UserDTO";
import {PrismaClient} from "@prisma/client";

const envService = new EnvService();
const prisma = new PrismaClient();

export class TokenService {
    async generateToken(payload: UserDTO) {
        const accessToken = jwt.sign(payload, envService.JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, envService.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {accessToken, refreshToken};
    }

    validateAccessToken(accessToken: string) {
        return jwt.verify(accessToken, envService.JWT_ACCESS_SECRET);
    }

    validateRefreshToken(refreshToken: string) {
        return jwt.verify(refreshToken, envService.JWT_REFRESH_SECRET);
    }

    saveToken(userId: number, refreshToken: string) {
        return prisma.token.upsert({
            where: {userId},
            update: {refreshToken},
            create: {userId, refreshToken},
        });
    }
}