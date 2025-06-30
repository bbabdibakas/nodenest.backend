import {Router} from 'express'
import {UserController} from "../controllers/UserController";
import {AuthController} from "../controllers/AuthController";
import {HetznerController} from "../controllers/HetznerController";
import {TokenService} from "../../application/services/TokenService";
import {authMiddleware} from "../middlewares/authMiddleware";
import {EnvService} from "../../application/services/EnvService";

export const router = (
    userController: UserController,
    authController: AuthController,
    hetznerController: HetznerController,
    tokenService: TokenService,
    envService: EnvService
) => {
    const router = Router();
    const requireAuth = authMiddleware(tokenService, envService);

    router.post('/auth/login', authController.login.bind(authController));
    router.post('/auth/logout', authController.logout.bind(authController));
    router.post('/auth/refresh', authController.refresh.bind(authController));
    router.post('/users', userController.createUser.bind(userController));
    router.get('/users', requireAuth, userController.getUsers.bind(userController));
    router.get('/servers', requireAuth, hetznerController.getServers.bind(hetznerController));

    return router
}