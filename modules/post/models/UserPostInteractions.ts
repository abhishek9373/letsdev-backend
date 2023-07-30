import mongoose from 'mongoose';

const UserPostInteractionsSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["like", "dislike", "share"],
        required: true
    }
},
    {
        strict: false,
        timestamps: true,
        versionKey: false,
    }
);

export { UserPostInteractionsSchema };
