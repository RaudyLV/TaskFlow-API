import {Router} from 'express';
import { getAllUsersController, getUserByIdController, updateUserController, deleteUserController } from '../controllers/users';
import { validateSchema } from '../middlewares/validateSchema';
import { updateUserSchema } from '../schemas/users';

export default (router: Router) =>{
    router.get('/users/:id', getUserByIdController);
    router.get('/users', getAllUsersController);
    router.patch('/users/:id', validateSchema(updateUserSchema), updateUserController);
    router.delete('/users/:id', deleteUserController);
}
