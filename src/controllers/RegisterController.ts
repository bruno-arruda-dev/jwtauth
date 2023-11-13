import { Request, Response } from 'express';
import { RegisterService } from '../services/RegisterService';
import { FieldVerification } from '../middlewares/FieldVerification';
import { PasswordMatchVerification } from '../middlewares/PasswordMatchVerification';

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

            // VERIFICATIONS

            // Name verification middleware
            if (!FieldVerification("name", name, res)) {
                return;
            }

            // Email verification middleware
            if (!FieldVerification("email", email, res)) {
                return;
            }

            // Email verification middleware
            if (!FieldVerification("password", password, res)) {
                return;
            }

            // Passwords match verification
            if (!PasswordMatchVerification(password, confirmPassword, res)) {
                return;
            }

            const registerService = new RegisterService();
            const currentRegister = registerService.execute({ name, email, password, confirmPassword });
            res.status(200).json(`Registered: ${name} ${email}`);

        } catch (error) {

            console.error(`Erro no registro: ${error}`);
            res.status(500).json({ error: 'Registration failed. Please check your information and try again.' });

        }
    }
}

export { RegisterController };