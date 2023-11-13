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

        // 
        if (!props.id) {
            throw new Error("Invalid argument to update.");
        }

        const findUser = await UserModel.findOne({ _id: props.id });

        if (!findUser) {
            throw new Error("User not found.");
        }

        const updateUserData = { ...props };

        const updatedUserData = await UserModel.findOneAndUpdate( { _id: props.id }, updateUserData, { new: true } );

        console.log(`USERDATA: ${updatedUserData}`)

    }
}

export { UpdateUserService };
