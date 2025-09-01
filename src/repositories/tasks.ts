import {Task, ITask} from '../models/task';

export class TaskRepository {
    async findById(id: string): Promise<ITask | null> {
        return Task.findById(id);
    }

    async getAll(): Promise<ITask[]> {
        return Task.find();
    }

    async create (taskData: Partial<ITask>): Promise<ITask> {
        const task = new Task(taskData);
        return task.save().then(t => t.toObject());
    }

    async update(id: string, updateData: Partial<ITask>): Promise<ITask | null> {
        return Task.findByIdAndUpdate(id, updateData, {new: true});
    }

    async delete(id: string): Promise<ITask | null> {
        return Task.findByIdAndDelete(id);
    }
}