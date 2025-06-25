import {ITokenRepository} from "../../core/interfaces/ITokenRepository";
import {Token} from "../../core/entities/Token";
import jwt from "jsonwebtoken";
import {EnvService} from "./EnvService";

interface Payload {
    id: number,
    name: string,
    username: string,
    createdAt: Date,
    updatedAt: Date,
}

export class TokenService {
    constructor(
        private tokenRepository: ITokenRepository,
        private envService: EnvService,
    ) {
    }

    generateTokens(payload: Payload) {
        const accessToken = jwt.sign(payload, this.envService.JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, this.envService.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {accessToken, refreshToken};
    }

    async saveToken(refreshToken: string, userId: number): Promise<Token> {
        const token = new Token(0, refreshToken, userId, new Date(), new Date());
        return this.tokenRepository.upsertToken(token);
    }

    async validateAccessToken(accessToken: string) {
        try {
            return jwt.verify(accessToken, this.envService.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }
}
