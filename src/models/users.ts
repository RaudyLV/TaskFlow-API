import {Schema, model, Document} from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    role: 'user' | 'admin';
    authentication: {
        password: string;
        salt: string;
        sessionToken?: string;
    }
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false}
    }
}, {timestamps: true}); //Crea createdAt y updatedAt automáticamente 


export const User = model<IUser>('User', userSchema);