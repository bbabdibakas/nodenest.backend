import {Request, Response, NextFunction} from "express";
import ApiError from "../exceptions/apiError";
import {AuthService} from "../../application/services/AuthService";

interface LoginUserDTO {
    username: string;
    password: string;
}

export class AuthController {
    constructor(private authService: AuthService) {
    }

    async login(
        req: Request<Record<string, never>, {}, LoginUserDTO>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const {username, password} = req.body ?? {}

            if (!username || !password) {
                next(ApiError.BadRequest("Username and password are required"));
                return
            }

            const userData = await this.authService.login(username, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.status(200).json({user: userData.user, accessToken: userData.accessToken})
        } catch (e) {
            next(e)
        }
    }

    async logout(
        req: Request & { cookies: { refreshToken?: string } },
        res: Response,
        next: NextFunction
    ) {
        try {
            const {refreshToken} = req.cookies

            if (!refreshToken) {
                res.status(204).end()
                return
            }

            await this.authService.logout(refreshToken)

            res.clearCookie('refreshToken')
            res.status(204).end()
        } catch (e) {
            next(e)
        }
    }
}