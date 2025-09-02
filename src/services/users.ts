import { ApiError } from "../utils/ApiError";
import { findById, update, deleteUser, getAll, fingBySessionToken } from "../repositories/users";
import { IUser } from "../models/users";


export const getAllUsers = async (): Promise<IUser[] | null> => {
    const users = await getAll();
    if(!users || users.length == 0){
        throw new ApiError(404, 'No users were found.');
    }

    return users
}

export const getUserById = async(id: string): Promise<IUser | null> => {
    const user = await findById(id);
    if(!user){
        throw new ApiError(404, 'User not found.');
    }

    return user;
}

export const getBySessionToken = (token: string) => fingBySessionToken(token);

export const updateUser = async(id: string, userData: Partial<IUser>): Promise<IUser | null> =>{
    try {    
        const user = await update(id, userData);
    
    if(!user){
        throw new ApiError(400, "User not found.");
    }
    
    return user;

    } catch (error) {
        console.log('Error updating user', error);
        throw new ApiError(500, 'Error updating user');
    }
}

export const deleteAsync = async(id: string): Promise<IUser | null> =>  await deleteUser(id);