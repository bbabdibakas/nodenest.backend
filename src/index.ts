import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {EnvService} from "./application/services/EnvService";
import {router} from "./infrastructure/router/router";
import errorMiddleware from "./infrastructure/middlewares/errorMiddleware";
import {TokenRepository} from './infrastructure/repositories/TokenRepository';
import {UserRepository} from "./infrastructure/repositories/UserRepository";
import {UserService} from "./application/services/UserService";
import {TokenService} from "./application/services/TokenService";
import {HetznerService} from "./application/services/HetznerService";
import {AuthService} from "./application/services/AuthService";
import {UserController} from "./infrastructure/controllers/UserController";
import {HetznerController} from "./infrastructure/controllers/HetznerController";
import {AuthController} from "./infrastructure/controllers/AuthController";

const tokenRepository = new TokenRepository();
const userRepository = new UserRepository();

const envService = new EnvService()
const tokenService = new TokenService(tokenRepository, envService);
const userService = new UserService(userRepository, tokenService);
const hetznerService = new HetznerService(envService)
const authService = new AuthService(userService, tokenService);

const userController = new UserController(userService);
const hetznerController = new HetznerController(hetznerService);
const authController = new AuthController(authService);

const port = envService.PORT
const app = express();

app.use(cors({
    credentials: true,
    origin: true,
}))
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1', router(userController, authController, hetznerController, tokenService, envService));
app.use(errorMiddleware);

const main = async () => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
}

void main()