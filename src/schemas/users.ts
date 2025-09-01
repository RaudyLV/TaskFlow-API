
import {z} from 'zod';

//Esquemas de validaciones para los inputs en los controladores de auth.
export const loginUserSchema = z.object({
    email: z.email('Email should be valid'),
    password: z.string().nonempty('Password is required')
})

export const registerUserSchema = z.object({
    name: z.string("Name must be a string").min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email').nonempty('Email is required'),
    password: z.string().nonempty("Password is required"),
    role: z.enum(['user', 'admin']).optional()
});

export const updateUserSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    role: z.enum(['user', 'admin'], 'Role must be admin or user').optional()
});

//Inferencia de tipos de schemas
export type RegisterUserInput = z.infer<typeof registerUserSchema>; 
export type LoginUserInput = z.infer<typeof loginUserSchema>; 
export type UpdateUserInput = z.infer<typeof updateUserSchema>;