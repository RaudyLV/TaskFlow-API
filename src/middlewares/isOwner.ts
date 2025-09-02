import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';


// Middleware: solo el dueño puede modificar su información
export const isOwner = (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id as string; // ID del recurso en la URL
        const userId = get(req, 'identity._id') as string | undefined; // ID del usuario logeado

        if (!userId) {
            throw new ApiError(401, 'User not authenticated');
        }

        if (userId.toString() !== id.toString()) {
            throw new ApiError(403, 'You can only modify your own account');
        }

        next();
    } catch (err) {
        if (err instanceof ApiError) {
            next(err);
        }
    }
};