import {UserService} from "./UserService";
import ApiError from "../../infrastructure/exceptions/apiError";
import bcrypt from "bcrypt";
import {TokenService} from "./TokenService";

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
            user,
            accessToken,
            refreshToken,
        };
    }
}
