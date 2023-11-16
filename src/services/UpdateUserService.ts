import { UserModel } from "../models/User";
import { Request } from "express";

type TUpdateUserServiceProps = {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    token?: string;
}

class UpdateUserService {

    async execute(id: string, body: TUpdateUserServiceProps): Promise<any> {
        const { name, username, email, password, token } = body;

        console.log(body)

        // 1 - VERIFICATIONS

        // 1.1 - ID verification
        if (!id) {
            throw new Error("Invalid argument to update.");
        }

        try {
            // 1.2 - Get user from database
            const findUser = await UserModel.findOne({ _id: id });

            // 1.2.1 - Check if user was found
            if (!findUser) {
                throw new Error("User not found.");
            }

            // 2 - Object mount
            const updateUserData: TUpdateUserServiceProps = {};

            if (name) {
                updateUserData.name = name;
            }

            if (username) {
                updateUserData.username = username;
            }

            if (email) {
                updateUserData.email = email;
            }

            if (password) {
                updateUserData.password = password;
            }

            if (token) {
                updateUserData.token = token;
            }

            // 3 - Update user on database
            const updatedUserData = await UserModel.findOneAndUpdate({ _id: findUser._id }, updateUserData, { new: true });

            return updatedUserData;

        } catch (error: any) {

            throw new Error(`Error updating user: ${error.message}`);
            
        }
    }
}

export { UpdateUserService };
