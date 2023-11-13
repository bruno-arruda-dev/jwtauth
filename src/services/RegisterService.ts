import { UserModel } from "../models/User";

type TRegisterType = {
    name: string, 
    email: string,
    password: string, 
}

class RegisterService {

    
    async execute({ name, email, password }: TRegisterType) {

        const user = new UserModel({
            name,
            email,
            password
        })

        try {
            
            await user.save();
            return user;

        } catch (error) {

            return error;
            
        }

    }
}

export { RegisterService };