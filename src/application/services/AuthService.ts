import {UserService} from "./UserService";
import ApiError from "../../infrastructure/exceptions/apiError";
import bcrypt from "bcrypt";
import {TokenService} from "./TokenService";
import {injectable} from "tsyringe";

@injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private tokenService: TokenService,
    ) {
    }

    async login(username: string, password: string) {
        const user = await this.userService.getUserByUsername(username);
        if (!user) {
            throw ApiError.NotFound("User not found");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw ApiError.BadRequest("Invalid credentials")
        }

        const payload = this.userService.getPayload(user);

        const {accessToken, refreshToken} = this.tokenService.generateTokens(payload)
        await this.tokenService.saveToken(refreshToken, user.id);

        return {
            user: payload,
            accessToken,
            refreshToken,
        };
    }

    async logout(refreshToken: string) {
        const userData = this.tokenService.validateRefreshToken(refreshToken);
        if (!userData) {
            return null
        }
        return this.tokenService.deleteToken(userData.id)
    }

    async refresh(oldRefreshToken: string) {
        const userData = this.tokenService.validateRefreshToken(oldRefreshToken);
        if (!userData) {
            throw ApiError.NotFound("User not found");
        }

        const user = await this.userService.getUserByUsername(userData.username);
        if (!user) {
            throw ApiError.NotFound("User not found");
        }

        const payload = this.userService.getPayload(user);

        const {accessToken, refreshToken} = this.tokenService.generateTokens(payload)
        await this.tokenService.saveToken(refreshToken, user.id);

        return {
            user: payload,
            accessToken,
            refreshToken,
        };
    }
}
