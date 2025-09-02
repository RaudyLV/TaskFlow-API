import {create, deleteTask, update, getAll, findById } from '../repositories/tasks';
import { ApiError } from '../utils/ApiError';
import { ITask, Task } from '../models/task';

export const getById = async(id: string): Promise<ITask | null> => await findById(id);

export const getAllTasks = async (): Promise<ITask[]> => {
    const tasks = await getAll();

    if(!tasks || tasks.length == 0){
        throw new ApiError(404, 'No tasks were found.');
    }

    return tasks;
}

export const createTask = async(
    title: string,
    description: string,
    assignedTo: string,
    status: string,
    dueDate: Date
    ): Promise<ITask> => {

        const task = new Task({
            title: title,
            description: description,
            assignedTo: assignedTo,
            status: status,
            dueDate: dueDate
        });

        await create(task);
        
        return task;
}

export const updateTask = async(id: string, userData: Partial<ITask>): Promise<ITask | null> => {
        const updatedTask = await update(id, userData);
        
        if(!updatedTask) {
            throw new ApiError(404, 'Task not found');
        }
        
        return updatedTask;
}

export const deleteTasks = async(id: string): Promise<ITask | null> => await deleteTask(id);