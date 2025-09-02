import { get } from 'lodash';
import { ApiError } from '../utils/ApiError';
import { Request, Response, NextFunction } from 'express';


export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = get(req, 'identity.role') as string | undefined;

        if (!role) {
            throw new ApiError(401, 'Unauthorized: role not found');
        }

        if (role !== 'admin') {
            throw new ApiError(403, 'Forbidden: only admins can perform this action');
        }

        next();
    } catch (err) {
        if (err instanceof ApiError) {
            return next(err);
        }
    }
}