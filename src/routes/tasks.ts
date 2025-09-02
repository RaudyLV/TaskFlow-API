import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { createTaskSchema, updateTaskSchema } from "../schemas/tasks";
import { getAllTasksController, createTaskController, deleteTaskController, updateTaskController } from "../controllers/tasks";
import { isAdmin } from "../middlewares/isAdmin";
import { isAuthenticated } from "../middlewares/isAuthenticated";


export default (router: Router) => {
    router.get('/tasks/', isAuthenticated, getAllTasksController);
    router.post('/tasks/', isAuthenticated, validateSchema(createTaskSchema), createTaskController);
    router.delete('/tasks/:id', isAuthenticated, isAdmin, deleteTaskController);
    router.patch('/tasks/:id', isAuthenticated, isAdmin, validateSchema(updateTaskSchema), updateTaskController);
}