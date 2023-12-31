import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { AuthenticateSession } from '../middlewares/AuthenticateSession';
import { UpdateUserService } from '../services/UpdateUserService';
import { UsernameGenerator } from '../middlewares/UsernameGenerator';

class UpdateUserController {
    async handle(req: Request, res: Response) {
        try {
            // Autenticate session middleware
            const authenticatedSession = await AuthenticateSession(req, res);

            if (authenticatedSession !== "Authenticated") {
                return;
            }

            const id = req.headers.id as string;

            const body = {} as {name?: string, username?: string, email?: string, password?: string, token?: string};

            if (req.body.name) {
                const name = req.body.name;
                const username = UsernameGenerator({name, id});
                body.name = req.body.name;
                body.username = username;
            }

            if (req.body.email) {
                body.email = req.body.email
            }

            if (req.body.password) {

                if(!req.body.confirmPassword) {

                    return res.status(500).json({msg: "Password change must have 'confirmPassword' field."})
                
                } else {

                    if (req.body.password === req.body.confirmPassword) {

                        const salt = await bcrypt.genSalt(12);
                        const password = req.body.password;
                        const passwordHash = await bcrypt.hash(req.body.password, salt);
                        body.password = passwordHash;                    
                    } else {

                        return res.status(500).json({msg: "Password and confirmPassword doesnt match."})

                    }
                }

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
