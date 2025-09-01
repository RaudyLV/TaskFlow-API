import {  ZodTypeAny } from "zod";
import { Request, Response, NextFunction } from "express";


//Este middleware se usa para validar el body y su tipo de dato en las request post de auth.
//parsea el body con safeParse para poder devolver los mensajes de errores personalizados
//que estan en schemas/users.ts
export const validateSchema = <T extends ZodTypeAny>(schema: T) =>
(req: Request, res: Response, next: NextFunction) => {
    try {
        const result = schema.safeParse(req.body); 
        if(!result.success){
            return res.status(400).json({errors: result.error.issues});
        }

        req.body = result.data;
        next();
        
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: error.errors
        })
    }
}