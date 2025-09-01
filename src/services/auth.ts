import { ApiError } from '../utils/ApiError';
import {random, authentication} from '../utils/hash';
import { findByEmail, create } from '../repositories/users';

export const loginUser = async (email: string, password: string) => {
        const user  = await findByEmail(email);
        
        if(!user){
            throw new ApiError(400, "Incorrect password or email");
        }

        const expectedPassword = authentication(user.authentication.salt, password);

        if(user.authentication.password !== expectedPassword ){
            throw new ApiError(400, 'Incorrect password or email')
        }

        const salt = random();

        const sessionToken = authentication(salt, password);

        user.authentication.sessionToken = sessionToken;
        
        await user.save();  

        return {
            success: true,
            message: `Welcome back ${user.name}`,
            sessionToken //Para las cookies
        }
}

export const registerUser = async (name: string, email: string, password: string) => {
    const existingUser = await findByEmail(email);

    if (existingUser) {
        throw new ApiError(400, 'User already exists',);
    }
    
    const salt = random();
    const hashedPassword = await authentication(salt, password);

    const newUser = await create({
        name,
        email,
        authentication: {
            password: hashedPassword,
            salt: salt
        },
        role: 'user' //default
    });

    return {
        success: true,
        message: 'User registered successfully',
        data: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
    }
}