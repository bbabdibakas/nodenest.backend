import {Request, Response} from 'express'

class AuthController {
    async login(req: Request, res: Response) {
        res.status(200).json({message: 'Hello, World!'});
    }
}

export default new AuthController();