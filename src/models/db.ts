import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URL: string | undefined = process.env.DATABASE_URL;

const connectDB = async () => {

    // VERIFY IF URL IS NOT UNDEFINED
    if (!URL) {
        console.error('DATABASE_URL is not defined in the environment variables.');
        return;
    }

    try {
        await mongoose.connect(URL);
        console.log(`Database connected!`);
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
    }

};

export default connectDB;