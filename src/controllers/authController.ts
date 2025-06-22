import {Request, Response, NextFunction} from 'express'
import ApiError from "../exceptions/apiError";
import {AuthService} from "../services/authService";
import {LoginDTO} from "../dtos/UserDTO";

const authService = new AuthService();

class AuthController {
    async login(req: Request<Record<string, never>, {}, LoginDTO>, res: Response, next: NextFunction) {
        try {
            const {username, password} = req.body ?? {}

            if (!username || !password) {
                next(ApiError.BadRequest("Username and password are required"));
                return
            }

            const user = await authService.login(username, password);

            res.status(200).json(user)
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController();