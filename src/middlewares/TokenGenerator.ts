import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

type TTokenGenerator = {
    id: string
}

const TokenGenerator = ({ id }: TTokenGenerator) => {

    try {
        
        const secret = process.env.SECRET;

        if (!secret) {
            throw new Error("Secret is not defined, please, verify .env file.");
        }

        const token = jwt.sign(
            {
                id: id
            },
            secret
        )

        return token;

    } catch (error) {

        return error;

    }
}

export { TokenGenerator };