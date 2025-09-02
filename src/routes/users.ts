import {Router} from 'express';
import { getAllUsersController, getUserByIdController, updateUserController, deleteUserController } from '../controllers/users';
import { validateSchema } from '../middlewares/validateSchema';
import { updateUserSchema } from '../schemas/users';
import { isAdmin } from "../middlewares/isAdmin";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isOwner } from '../middlewares/isOwner';

export default (router: Router) =>{
    router.get('/users/:id', isAuthenticated, isAdmin, getUserByIdController);
    router.get('/users', isAuthenticated, isAdmin, getAllUsersController);
    router.patch('/users/:id', isAuthenticated, isOwner, validateSchema(updateUserSchema), updateUserController);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUserController);
}
