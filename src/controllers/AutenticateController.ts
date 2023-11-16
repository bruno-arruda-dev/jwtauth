import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { FieldVerification } from '../middlewares/FieldVerification';
import { TokenGenerator } from '../middlewares/TokenGenerator';
import { UpdateUserService } from '../services/UpdateUserService';
import { UserModel } from '../models/User';

type TAutenticateController = {
    email: string,
    password: string,
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
            const userExists = await UserModel.findOne({ email });

            if (!userExists) {
                return res.status(422).json({ msg: "User not found." });
            }

            // 1.4 - Check if password match
            const checkPassword = await bcrypt.compare(password, userExists.password);
            if (!checkPassword) {
                return res.status(422).json({msg: "Wrong password!"});
            }

            // 2 - TOKEN MANAGER

            // 2.1 - JWT Token generate
            const userId = userExists._id;
            const userName = userExists.username;
            const token = TokenGenerator(userId) as string;

            // 2.2 - Save token on database
            const tokenSaved = new UpdateUserService().execute(userId, { token });

            res.status(200).json({ msg: "Autentication sucsess", userId, userName, token });

        } catch (error) {

            console.error(`Authentication failed. Please check your information and try again. ${error}`);
            res.status(500).json({ error: 'Authentication failed. Please check your information and try again.' });

        }

    }
}

export { AutenticateController };