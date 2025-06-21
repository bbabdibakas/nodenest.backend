import {Request, Response, NextFunction} from 'express'
import authService from "../services/authService";
import ApiError from "../exceptions/apiError";

interface LoginBody {
    username?: string;
    password?: string;
}

class AuthController {
    async login(req: Request<Record<string, never>, {}, LoginBody>, res: Response, next: NextFunction) {
        try {
            const {username, password} = req.body ?? {}

            if (!username || !password) {
                next(ApiError.BadRequest("Username and password are required"));
                return
            }

            console.log(username, password);
            const token = await authService.login(username, password);

            if (!token) {
                next(ApiError.BadRequest("Invalid credentials"));
                return
            }

            res.status(200).json(token)
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController();