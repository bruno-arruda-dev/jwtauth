// services/UserExists.ts
import { UserModel } from "../models/User";

type TUserExists = {
    email: string,
}

const UserExists = async ({ email }: TUserExists) => {
    return await UserModel.findOne({ email }).exec();
}

export { UserExists };