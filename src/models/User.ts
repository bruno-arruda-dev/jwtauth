import mongoose, { Schema, Document } from 'mongoose';

// User schema
const userSchema = new Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    token: String,
});

// Schema creation: "SCHEMA_NAME / SCHEMA_TYPE / SCHEMA_PARAMS(SCHEMA_NAME, SCHEMA)"
const UserModel = mongoose.model<Document & { name: string, username: string, email: string, password: string, token: string }>('User', userSchema);

export { UserModel };