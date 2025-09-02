import {  merge } from "lodash";
import { ApiError } from "../utils/ApiError";
import { Request, Response, NextFunction } from "express";
import { getBySessionToken } from "../services/users";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['RAUDY-AUTH'];

        if(!token){
            throw new ApiError(400, 'Invalid token.');
        }

        const user = await getBySessionToken(token);

        if(!user){
            throw new ApiError(403, 'You are not authenticated.')
        }

        merge(req, {identity: user});

        return next();

    } catch (error) {
        console.log(error);
        if(error instanceof ApiError){
            next(error);
        }
    }
}