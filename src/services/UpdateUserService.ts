import { UserModel } from "../models/User";

type TUpdateUserServiceProps = {
    id: string;
    name?: string;
    username?: string,
    email?: string;
    password?: string;
    token?: string;
}

class UpdateUserService {
    async execute(props: TUpdateUserServiceProps) {

        console.log(`${props.id} - ${props.name} - ${props.username} - ${props.email} - ${props.password} - ${props.token}`);

        // 1 - VERIFICATIONS

        // 1.1 - ID verification
        if (!props.id) {
            throw new Error("Invalid argument to update.");
        }
        
        // 1.2 Get user from database
        const findUser = await UserModel.findOne({ _id: props.id });
        
        // 1.2.1 - Check if user was founded
        if (!findUser) {
            throw new Error("User not found.");
        }

        // 2 - Object mount
        const updateUserData = { ...props };

        // 3 - Update user on database
        const updatedUserData = await UserModel.findOneAndUpdate( { _id: props.id }, updateUserData, { new: true } );

        return updatedUserData;

    }
}

export { UpdateUserService };
