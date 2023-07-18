import mongoose, { Schema } from 'mongoose';



const FileSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false
    },
    name: {
      type: String,
    },
    key: {
      type: String,
      required: true,
      index: true,
    },
    size: Number,
    extension: String,
    meta: Map,
    module: String,
  },
  {
    strict: false,
    timestamps: true,
    versionKey: false,
  }
);

export {FileSchema};
