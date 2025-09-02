import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string("The title must be a string").min(5, 'The title must have at least 5 letters').nonempty("The title is required"),
    description: z.string("The description must be a string").max(500, 'The title cant be greater than 500 characters').nonempty('The description is required'),
    assignedTo: z.string().nonempty("The user id is required"),
    status: z.enum(['pending', 'in-progress', 'completed'], 'The status must be pending, in-progress, completed').optional(),
    dueDate: z.date("Invalid date format").optional(),
});

export const updateTaskSchema = z.object({
    title: z.string("The title must be a string").min(5, 'The title must have at least 5 letters').nonempty("The title is required").optional(),
    description: z.string("The description must be a string").max(500, 'The title cant be greater than 500 characters').nonempty('The description is required').optional(),
    assignedTo: z.string().nonempty("The user id is required").optional(),
    status: z.enum(['pending', 'in-progress', 'completed'], 'The status must be pending, in-progress, completed').optional(),
    dueDate: z.date("Invalid date format").optional(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;