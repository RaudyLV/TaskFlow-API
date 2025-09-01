import {Request, Response, NextFunction} from 'express';
import { registerUser, loginUser } from '../services/auth';
import { ApiError } from '../utils/ApiError';

export const loginUserController = async(req: Request, res: Response, next: NextFunction) =>{
    try {
        const {email, password} = req.body;

        const user = await loginUser(email, password);

        res.cookie('RAUDY-AUTH', user.sessionToken);


        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        if(error instanceof ApiError){
            next(error);
        }
    }
}

export const registerController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email, password} = req.body;

        const result = await registerUser(
            name, 
            email, 
            password
        );

        return res.status(201).json(result);

    } catch (error) {
        console.error(error);
        if (error instanceof ApiError) {
            return next(error);
        }
    }
}