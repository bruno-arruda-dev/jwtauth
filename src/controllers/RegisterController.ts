import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { RegisterService } from '../services/RegisterService';
import { FieldVerification } from '../middlewares/FieldVerification';
import { PasswordMatchVerification } from '../middlewares/PasswordMatchVerification';
import { UserExists } from '../services/UserExists';
import { UsernameGenerator } from '../middlewares/UsernameGenerator';
import { TokenGenerator } from '../middlewares/TokenGenerator';
import { UpdateUserService } from '../services/UpdateUserService';

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

            // 1.3 - password verification middleware
            if (!FieldVerification("password", password, res)) {
                return;
            }

            // 1.4 - Passwords match verification
            if (!PasswordMatchVerification(password, confirmPassword, res)) {
                return;
            }

            // 1.5 - Check if user exists
            const userExists = await UserExists({ email });

            if (userExists) {
                return res.status(422).json({ msg: "User with this email already exists." });
            }

            // 2 - CREATE PASSWORD
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            
            // 3 - CREATE USER -> SAVE ON DATABASE
            const registerService = new RegisterService();
            const currentRegister = await registerService.execute({ name, email, password: passwordHash });
            res.status(201).json(`Registered: ${name} ${email}`);

            // 4 - ADITIONAL GENERATIONS

            // 4.1 - Check if step 3 was succefull
            const savedUser = await UserExists({ email });

            if (!savedUser) {
                return res.status(422).json({ msg: "User not found." });
            }
            
            // 4.2 - Username generate
            const username = UsernameGenerator({ name, id: savedUser._id });
            
            // 4.3 - JWT Token generate
            const token = TokenGenerator(savedUser._id) as string;

            // 5 - UPDATE USER CREATED

                new UpdateUserService().execute({ id: savedUser._id, username, token });

        } catch (error) {

            console.error(`Registration failed. Please check your information and try again.: ${error}`);
            res.status(500).json({ error: 'Registration failed. Please check your information and try again.' });

        }
    }
}

export { RegisterController };