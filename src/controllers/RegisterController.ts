import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { RegisterService } from '../services/RegisterService';
import { FieldVerification } from '../middlewares/FieldVerification';
import { PasswordMatchVerification } from '../middlewares/PasswordMatchVerification';
import { UsernameGenerator } from '../middlewares/UsernameGenerator';
import { TokenGenerator } from '../middlewares/TokenGenerator';
import { UpdateUserService } from '../services/UpdateUserService';
import { UserModel } from '../models/User';

type TRegisterRequestBody = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
};

class RegisterController {
    async handle(req: Request<{}, {}, TRegisterRequestBody>, res: Response) {
        try {
            const { name, email, password, confirmPassword } = req.body;

            // 1 - VERIFICATIONS

            // 1.1 - Name verification middleware
            if (!FieldVerification("name", name, res)) {
                return;
            }

            // 1.2 - Email verification middleware
            if (!FieldVerification("email", email, res)) {
                return;
            }

            // 1.3 - Password verification middleware
            if (!FieldVerification("password", password, res)) {
                return;
            }

            // 1.4 - Passwords match verification
            if (!PasswordMatchVerification(password, confirmPassword, res)) {
                return;
            }

            // 1.5 - Check if user exists
            const userExists = await UserModel.findOne({ email });

            if (userExists) {
                return res.status(422).json({ msg: "User with this email already exists." });
            }

            // 2 - CREATE PASSWORD
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            // 3 - CREATE USER -> SAVE ON DATABASE
            const registerService = new RegisterService();
            const currentRegister = await registerService.execute({ name, email, password: passwordHash });

            // 4 - ADDITIONAL GENERATIONS

            // 4.1 - Check if step 3 was successful
            const savedUser = await UserModel.findOne({ email });

            if (!savedUser) {
                return res.status(422).json({ msg: "User not found." });
            }

            const id = savedUser._id;

            // 4.2 - Username generation
            const username = UsernameGenerator({ name, id});

            // 4.3 - JWT Token generation
            const token = TokenGenerator(id) as string;

            const aditionalData = {username: username, token: token}

            // 5 - UPDATE USER CREATED
            const updatedUserData = new UpdateUserService().execute(id, aditionalData);

            // 6 - FEEDBACK
            const createdUser = await UserModel.findOne({ token }).select("-password");

            res.status(200).json(createdUser);

        } catch (error) {
            console.error(`Registration failed. Please check your information and try again: ${error}`);
            res.status(500).json({ error: 'Registration failed. Please check your information and try again.' });
        }
    }
}

export { RegisterController };