import Mongoose from "mongoose";

export const userSchema: Mongoose.Schema = new Mongoose.Schema({
    name: {
        type: String,
        index: true
    }, 
    email: {
        type: String,
        unique: true,
        index: true
    },
    gender: {
        type: String,
        enum: [1, 2, 0]
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},
    {
        strict: false,
        timestamps: true,
        versionKey: false
    },
);
