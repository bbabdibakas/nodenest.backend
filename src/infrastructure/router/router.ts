import {Router} from 'express'
import {UserController} from "../controllers/UserController";
import {AuthController} from "../controllers/AuthController";
import {HetznerController} from "../controllers/HetznerController";
import {authMiddleware} from "../middlewares/authMiddleware";
import {HostController} from "../controllers/HostController";

export const router = (
    userController: UserController,
    authController: AuthController,
    hetznerController: HetznerController,
    hostController: HostController,
) => {
    const router = Router();
    const requireAuth = authMiddleware();

    router.post('/auth/login', authController.login.bind(authController));
    router.post('/auth/logout', authController.logout.bind(authController));
    router.post('/auth/refresh', authController.refresh.bind(authController));
    router.post('/users', userController.createUser.bind(userController));
    router.get('/users', requireAuth, userController.getUsers.bind(userController));

    //hosts
    router.get('/hosts/hetzner', requireAuth, hetznerController.getServers.bind(hetznerController));
    router.get('/hosts', hostController.getHosts.bind(hostController));
    router.post('/hosts/actualize', hostController.actualizeHosts.bind(hostController));

    return router
}