import {Router} from 'express'
import authController from "../controllers/authController";
import userController from "../controllers/userController";

const router = Router();

router.post('/login', authController.login);
router.post('/users', userController.createUser);

export default router;