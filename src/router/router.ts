import {Router} from 'express'
import authController from "../controllers/authController";
import userController from "../controllers/userController";

const router = Router();

router.post('/auth/login', authController.login);
router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);

export default router;