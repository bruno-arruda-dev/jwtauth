import { Response } from 'express';

export const PasswordMatchVerification = (password: string, confirmPassword: string, res: Response) => {

    if (password !== confirmPassword) {

        res.status(422).json({ msg: `Passwords do not match. Please try again.` });
        return false; // Validation failed
        
    }

    return true; // Validation success

};