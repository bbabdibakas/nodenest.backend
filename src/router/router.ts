import {Router} from 'express'
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import hetznerController from "../controllers/hetznerController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post('/auth/login', authController.login);
router.post('/users', authMiddleware, userController.createUser);
router.get('/users', authMiddleware, userController.getUsers);
router.get('/servers', authMiddleware, hetznerController.getServers);

export default router;