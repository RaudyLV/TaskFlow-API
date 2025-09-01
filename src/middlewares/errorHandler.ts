import { ApiError } from "../utils/ApiError";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let { statusCode, message } = err;
    if(err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    
    res.status(statusCode || 500).json({
        success: false,
        status: 'error',
        statusCode,
        message: message || 'Internal Server Error'
    });
}