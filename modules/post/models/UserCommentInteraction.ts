import mongoose from 'mongoose';

const UserCommentInteractionsSchema = new mongoose.Schema({
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostComment",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ["like", "dislike"],
        required: true
    }
},
    {
        strict: false,
        timestamps: true,
        versionKey: false,
    }
);

export { UserCommentInteractionsSchema };
