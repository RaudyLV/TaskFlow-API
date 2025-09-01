import {Schema, model, Document} from 'mongoose';

export interface ITask extends Document {
    title: string;
    description?: string;
    assignedTo: Schema.Types.ObjectId;
    status: 'pending' | 'in-progress' | 'completed';
    dueDate?: Date;
    createdAt: Date
    updatedAt: Date
}

const taskSchema = new Schema<ITask>({
    title: {type: String, required: true, minlength: 5},
    description: {type: String, maxlength: 500},
    assignedTo: {type: Schema.Types.ObjectId, ref: 'User', required: true}, //Refiere al modelo User
    status: {type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending'},
    dueDate: {type: Date,  default: () => new Date(Date.now() + 7*24*60*60*1000)} // Default de 1 semana
}, {timestamps: true}); //Crea createdAt y updatedAt automáticamente

export const Task = model<ITask>('Task', taskSchema);