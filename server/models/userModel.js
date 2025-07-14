import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            require: true
        },   
})

const user = mongoose.model('User', userSchema);
export default user;