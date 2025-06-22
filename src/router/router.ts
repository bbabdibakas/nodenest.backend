import {Router} from 'express'
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post('/auth/login', authController.login);
router.post('/users', authMiddleware, userController.createUser);
router.get('/users', authMiddleware, userController.getUsers);

export default router;