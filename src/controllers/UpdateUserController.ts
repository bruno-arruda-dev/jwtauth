import { Request, Response } from 'express';
import { AutenticateSession } from '../middlewares/AutenticateSession';
import { UpdateUserService } from '../services/UpdateUserService';

class UpdateUserController {
    async handle(req: Request, res: Response) {
        try {
            // Autenticate session middleware
            const authenticatedSession = await AutenticateSession(req, res);

            if (authenticatedSession !== "Authenticated") {
                throw new Error("Unable to authenticate");
            }

            const id = req.headers.id as string;

            const body = {} as {name?: string, username?: string, email?: string, password?: string, token?: string};

            if (req.body.name) {
                body.name = req.body.name
            }
            if (req.body.username) {
                body.username = req.body.username
            }
            if (req.body.email) {
                body.email = req.body.email
            }
            if (req.body.password) {
                body.password = req.body.password
            }
            if (req.body.token) {
                body.token = req.body.token
            }

            const updatedUserData = await new UpdateUserService().execute(id, body);

            res.status(200).json({msg: "Updated!", updatedUserData});

        } catch (error: any) {

            console.error(`Update failed: ${error.message}`);
            res.status(500).json({ error: 'Update failed. Please check your information and try again.' });
            
        }
    }
}

export { UpdateUserController };
