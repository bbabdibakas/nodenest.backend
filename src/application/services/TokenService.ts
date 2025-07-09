import {ITokenRepository, ITokenRepositoryToken} from "../../core/interfaces/ITokenRepository";
import {Token} from "../../core/entities/Token";
import jwt from "jsonwebtoken";
import {EnvService} from "./EnvService";
import {UserDTO} from "../dtos/UserDTO";
import {JWTPayloadDTO} from "../dtos/JWTPayloadDTO";
import {inject, injectable} from "tsyringe";

@injectable()
export class TokenService {
    constructor(
        @inject(ITokenRepositoryToken) private tokenRepository: ITokenRepository,
        private envService: EnvService,
    ) {
    }

    generateTokens(payload: UserDTO) {
        const accessToken = jwt.sign(payload, this.envService.JWT_ACCESS_SECRET, {expiresIn: '15s'});
        const refreshToken = jwt.sign(payload, this.envService.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {accessToken, refreshToken};
    }

    async saveToken(refreshToken: string, userId: number): Promise<Token> {
        const token = new Token(0, refreshToken, userId, new Date(), new Date());
        return this.tokenRepository.upsertToken(token);
    }

    validateAccessToken(accessToken: string): JWTPayloadDTO | null {
        try {
            const payload = jwt.verify(accessToken, this.envService.JWT_ACCESS_SECRET);

            if (typeof payload === 'object' && payload !== null) {
                return payload as JWTPayloadDTO;
            }

            return null;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    validateRefreshToken(refreshToken: string): JWTPayloadDTO | null {
        try {
            const payload = jwt.verify(refreshToken, this.envService.JWT_REFRESH_SECRET);

            if (typeof payload === 'object' && payload !== null) {
                return payload as JWTPayloadDTO;
            }

            return null;
        } catch (e) {
            return null;
        }
    }

    async deleteToken(userId: number) {
        const token = new Token(0, '', userId, new Date(), new Date());
        return this.tokenRepository.deleteToken(token)
    }
}
