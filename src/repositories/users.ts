import {User, IUser} from '../models/users';

export const getAll = (): Promise<IUser[]> => User.find();

export const findByEmail = (email: string): Promise<IUser | null> => User.findOne({email})
                                                                            .select('+authentication.salt +authentication.password');

export const  findById = (id: string): Promise<IUser | null> => User.findById(id);

export const create = (userData: Partial<IUser>): Promise<IUser> =>{
    const user = new User(userData);
    return user.save().then(u => u.toObject());
}

export const update = (id: string, userData: Partial<IUser>): Promise<IUser | null> => {
    return User.findByIdAndUpdate(id, userData, {new: true});
}

export const deleteUser = (id: string): Promise<IUser | null> =>{
    return User.findByIdAndDelete(id);
}



