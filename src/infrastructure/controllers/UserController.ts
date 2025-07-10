import {Request, Response, NextFunction} from "express";
import ApiError from "../exceptions/apiError";
import {injectable} from "tsyringe";
import {UserService} from "../../application/services/UserService";
import {CreateUserDTO} from "../../application/dtos/CreateUserDTO";

@injectable()
export class UserController {
    constructor(
        private userService: UserService
    ) {
    }

    async createUser(
        req: Request<Record<string, never>, {}, CreateUserDTO>,
        res: Response,
        next: NextFunction
    ) {
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

            const userData = await this.userService.createUser(req.body)
            res.status(200).json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.getUsers()
            res.status(200).json(users)
        } catch (e) {
            next(e)
        }
    }
}