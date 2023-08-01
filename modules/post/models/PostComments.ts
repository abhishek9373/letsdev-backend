import mongoose from 'mongoose';

const PostCommentsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    }
},
    {
        strict: false,
        timestamps: true,
        versionKey: false,
    }
);

export { PostCommentsSchema };
