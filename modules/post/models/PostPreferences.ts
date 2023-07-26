import mongoose from 'mongoose';

const PostPreferenceSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    likes: {
      type : Number,
      default: 0
    },
    dislikes: { 
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0
    },
},
  {
    strict: false,
    timestamps: false,
    versionKey: false,
  }
);

export { PostPreferenceSchema };
