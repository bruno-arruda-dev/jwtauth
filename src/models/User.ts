import mongoose, { Schema, Document } from 'mongoose';

// User schema
const userSchema = new Schema({
    name: String,
    email: String,
    password: String
});

// Schema creation: "SCHEMA_NAME / SCHEMA_TYPE / SCHEMA_PARAMS(SCHEMA_NAME, SCHEMA)"
const UserModel = mongoose.model<Document & { name: string, email: string, password: string }>('User', userSchema);

export { UserModel };