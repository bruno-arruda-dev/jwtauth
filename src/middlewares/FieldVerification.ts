import { Response } from 'express';

export const FieldVerification = (fieldName: string, name: string, res: Response) => {

    if (!name) {

        res.status(422).json({ msg: `Please provide your ${fieldName}.` });
        return false; // Validation failed

    }

    return true; // Validation success
    
};
