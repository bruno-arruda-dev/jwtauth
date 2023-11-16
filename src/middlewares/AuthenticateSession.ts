import { Request, Response } from 'express';
import { UserModel } from '../models/User';

const AuthenticateSession = async (req: Request<{}, {}>, res: Response) => {

    try {

        const id = req.headers.id;
        const token = req.headers.token;

        const findUser = await UserModel.findOne({ token: token });
        const dbId = findUser?.id;
        const name = findUser?.name;
        const username = findUser?.username;

        if (id !== dbId) {
            return res.status(500).json({ msg: "This user are not owner of this token" });
        }
        
        if (!findUser) {
            return res.status(500).json({ msg: "Token not found, try a new login" });
        }
        
        // res.status(200).json({ msg: "User authentication success!", name, username });
                
        return "Authenticated";
        
    } catch (error) {
        
        console.error(`Authentication with token failed. Please check your information and try again. ${error}`);
        res.status(500).json({ error: 'Authentication with token failed. Please check your information and try again.' });
    }

}

export { AuthenticateSession };