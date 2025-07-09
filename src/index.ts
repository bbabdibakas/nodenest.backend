import "reflect-metadata"
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {EnvService} from "./application/services/EnvService";
import {router} from "./infrastructure/router/router";
import errorMiddleware from "./infrastructure/middlewares/errorMiddleware";
import {TokenRepository} from './infrastructure/repositories/TokenRepository';
import {UserRepository} from "./infrastructure/repositories/UserRepository";
import {UserController} from "./infrastructure/controllers/UserController";
import {HetznerController} from "./infrastructure/controllers/HetznerController";
import {AuthController} from "./infrastructure/controllers/AuthController";
import {HostRepository} from "./infrastructure/repositories/HostRepository";
import {HostController} from "./infrastructure/controllers/HostController";
import {container} from "tsyringe";
import {IUserRepositoryToken} from "./core/interfaces/IUserRepository";
import {IHostRepositoryToken} from "./core/interfaces/IHostRepository";
import {ITokenRepositoryToken} from "./core/interfaces/ITokenRepository";

container.register(IHostRepositoryToken, {
    useClass: HostRepository,
});
container.register(ITokenRepositoryToken, {
    useClass: TokenRepository,
});
container.register(IUserRepositoryToken, {
    useClass: UserRepository,
});

const userController = container.resolve(UserController);
const authController = container.resolve(AuthController);
const hostController = container.resolve(HostController);
const hetznerController = container.resolve(HetznerController);
const envService = container.resolve(EnvService);

const port = envService.PORT
const app = express();

app.use(cors({
    credentials: true,
    origin: true,
}))
app.use(cookieParser());
app.use(express.json());
app.use('/api/v1', router(userController, authController, hetznerController, hostController));
app.use(errorMiddleware);

const main = async () => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
}

void main()