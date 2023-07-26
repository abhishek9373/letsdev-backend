import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
      type : String,
      required: true,
    },
    body: { 
      type: String
    },
    tags: {
      type: Array
    },
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
    }
},
  {
    strict: false,
    timestamps: true,
    versionKey: false,
  }
);

export { PostSchema };
