import {Request, Response} from 'express'
import AuthService from "../services/authService";

interface LoginBody {
    username?: string;
    password?: string;
}

class AuthController {
    async login(req: Request<Record<string, never>, {}, LoginBody>, res: Response) {
        try {
            const {username, password} = req.body ?? {}

            if (!username || !password) {
                res.status(401).json({error: "Username and password are required"});
                return
            }

            const token = await AuthService.login(username, password);

            if (!token) {
                res.status(401).json({error: "Invalid credentials"});
                return
            }

            res.status(200).json(token)
        } catch (e) {
            console.error(e);
            res.status(500).json({error: 'Internal Server Error'});
            return
        }
    }
}

export default new AuthController();