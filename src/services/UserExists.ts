import { UserModel } from "../models/User";

type TUserExists = {
    email: string,
}

// Return user if hes founded

const UserExists = async ({ email }: TUserExists) => {
    return await UserModel.findOne({ email }).exec();
}

export { UserExists };