import {Task, ITask} from '../models/task';


export const findById = (id: string): Promise<ITask | null> => Task.findById(id);

export const getAll = (): Promise<ITask[] | null> => Task.find();

export const create = (taskData: Partial<ITask>): Promise<ITask> => {
        const task = new Task(taskData);
        return task.save().then(t => t.toObject());
    }

export const update = (id: string, updateData: Partial<ITask>): Promise<ITask | null> => {
        return Task.findByIdAndUpdate(id, updateData, {new: true});
    }

export const deleteTask =(id: string): Promise<ITask | null> => {
        return Task.findByIdAndDelete(id);
    }