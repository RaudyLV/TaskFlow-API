import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { getAllTasks,  createTask, updateTask, deleteTasks, getById } from "../services/task";
import { stat } from "fs";
import { success } from "zod";


export const getAllTasksController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await getAllTasks();

        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        if(error instanceof ApiError){
            next(error);
        }
    }
}

export const createTaskController = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, assignedTo, status, dueDate } = req.body;

    try {
        const task = await createTask(title, description, assignedTo, status, dueDate);
        

        return res.status(201).json({
            success: true,
            message: 'Task created succesfully',
            data: {
                task
            }
        });
    } catch (error) {
        console.log(error);
        if(error instanceof ApiError){
            next(error);
        }
    }
}

export const updateTaskController = async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const {title, description, status, dueDate} = req.body;

    try {
        const task = await getById(id);
        if(!task){
            throw new ApiError(404, 'Task not found.');
        }

        task.title = title;
        task.description = description;
        task.status = status;
        task.dueDate = dueDate;

        const updatedTask = await updateTask(id, task);

        return res.status(200).json({
            success: true,
            message: 'Task updated succesfully',
            data: {
                updatedTask
            }
        })

    } catch (error) {
        console.log(error);
        if(error instanceof ApiError){
            next(error);
        }
    }
}

export const deleteTaskController = async (req: Request, res: Response, next: NextFunction) =>{
    const { id } = req.params;
    try {
        await deleteTasks(id);

        return res.json({success: true, message: 'Task deleted succesfully'});
    } catch (error) {
        console.log(error);
        if(error instanceof ApiError){
            next(error);
        }
    }
}