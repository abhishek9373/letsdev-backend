import Mongoose from "mongoose";

export const EmailSession: Mongoose.Schema = new Mongoose.Schema({
    email: {
        type: String,
        required: true
    },
},
    {
        strict: false,
        timestamps: true,
        versionKey: false
    },
);
