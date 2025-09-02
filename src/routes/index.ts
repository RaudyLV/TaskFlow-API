import { Router } from 'express';
import auth from './auth';
import users from './users';
import tasks from './tasks';

const router = Router();

export default (): Router => {
    auth(router);
    users(router);
    tasks(router);
    
    return router;
}