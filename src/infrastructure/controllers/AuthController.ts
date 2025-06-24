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
            res.status(200).json(userData)
        } catch (e) {
            next(e)
        }
    }
}