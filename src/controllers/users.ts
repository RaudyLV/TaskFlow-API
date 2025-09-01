import { deleteAsync, updateUser, getUserById, getAllUsers } from "../services/users";
import { Response, Request, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const getAllUsersController = async(req: Request, res: Response, next: NextFunction) => {
    try{
        var users = await getAllUsers();
        
        if(!users || users.length == 0){
            throw new ApiError(404, 'There is no users');
        }

        return res.status(200).json(users);
    }catch(err){
        console.log(err);
        if(err instanceof ApiError){
            next(err);
        }
    }
}

export const getUserByIdController = async(req: Request, res: Response, next: NextFunction) =>{
    const {id} = req.params;

    try{
        const user = await getUserById(id);

        if(!user) {
            throw new ApiError(404, "User not found.");
        }

        return res.status(200).json(user);

    }catch(err){
        console.log(err);
        if(err instanceof ApiError){
            next(err);
        }
    }

}

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const {name, role} = req.body;
    
    try {
        var user = await getUserById(id);

        if(!user) {
            throw new ApiError(404, "User not found.");
        }

        user.role = role;
        user.name = name;

        var updatedUser = await updateUser(id, user);


        return res.status(200).json({
            success: true,
            message: 'User updated succesfully',
            updatedUser
        });

    } catch (error) {
        console.log(error);
        if(error instanceof ApiError){
            next(error);
        }
    }
}

export const deleteUserController = async(req: Request, res: Response, next: NextFunction) =>{
    const { id } = req.params;

    try {
        const user = deleteAsync(id);
        if(!user){
            throw new ApiError(404, 'User not found.')
        }

        return res.json({
            success: true,
            message: 'User deleted succesfully',
        });
    } catch (error) {
        console.log(error)
        if(error instanceof ApiError){
            next(error);
        }
    }
}