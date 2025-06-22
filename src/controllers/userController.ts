import {Request, Response, NextFunction} from 'express'
import {UserService} from "../services/userService";
import {CreateUserDTO} from "../dtos/UserDTO";
import ApiError from "../exceptions/apiError";

const userService = new UserService();

class UserController {
    async createUser(req: Request<Record<string, never>, {}, CreateUserDTO>, res: Response, next: NextFunction) {
        try {
            const {
                name,
                username,
                password
            } = req.body || {}

            if (!name || !username || !password) {
                next(ApiError.BadRequest("Name, Username and password are required"));
                return
            }

            const user = await userService.createUser({name, username, password})
            res.status(200).json(user)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getUsers()
            res.status(200).json(users)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController();