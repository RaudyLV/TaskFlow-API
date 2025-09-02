import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { createTaskSchema, updateTaskSchema } from "../schemas/tasks";
import { getAllTasksController, createTaskController, deleteTaskController, updateTaskController } from "../controllers/tasks";


export default (router: Router) => {
    router.get('/tasks/', getAllTasksController);
    router.post('/tasks/', validateSchema(createTaskSchema), createTaskController);
    router.delete('/tasks/:id', deleteTaskController);
    router.patch('/tasks/:id', validateSchema(updateTaskSchema), updateTaskController);
}