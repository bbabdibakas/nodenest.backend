import {Request, Response, NextFunction} from 'express'
import userService from "../services/userService";

class UserController {
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getUsers();
            res.status(200).json(users)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController();