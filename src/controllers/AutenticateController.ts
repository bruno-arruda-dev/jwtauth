import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { FieldVerification } from '../middlewares/FieldVerification';
import { UserExists } from '../services/UserExists';
import { TokenGenerator } from '../middlewares/TokenGenerator';

type TAutenticateController = {
    email: string,
    password: string
}

class AutenticateController {
    async handle(req: Request<{}, {}, TAutenticateController>, res: Response) {
        try {
            const { email, password } = req.body;

            // 1 - VERIFICATIONS

            // 1.1 - Email verification middleware
            if (!FieldVerification("email", email, res)) {
                return;
            }

            // 1.2 - password verification middleware
            if (!FieldVerification("password", password, res)) {
                return;
            }

            // 1.3 - Check if user exists
            const userExists = await UserExists({ email });

            if (!userExists) {
                return res.status(422).json({ msg: "User not found." });
            }

            // Check if password match
            const checkPassword = await bcrypt.compare(password, userExists.password);
            if (!checkPassword) {
                return res.status(422).json({msg: "Wrong password!"});
            }

            // JWT Token generate
            const token = TokenGenerator(userExists._id);

            res.status(200).json({ msg: "Autentication sucsess", token });

        } catch (error) {

            console.error(`Authentication failed. Please check your information and try again. ${error}`);
            res.status(500).json({ error: 'Authentication failed. Please check your information and try again.' });

        }

    }
}

export { AutenticateController };