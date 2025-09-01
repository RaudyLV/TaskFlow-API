import {Router} from 'express';
import { registerController, loginUserController } from '../controllers/auth';
import { validateSchema } from '../middlewares/validateSchema';
import { loginUserSchema, registerUserSchema } from '../schemas/users';

export default (router: Router) => {
    router.post('/register', validateSchema(registerUserSchema), registerController);
    router.post('/login', validateSchema(loginUserSchema), loginUserController)
}