import mongoose from 'mongoose';

const userAnswerInteraction = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    answerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type:{
        type: Number,
        enum: [1, 2],
        required: true
    }
},
  {
    strict: false,
    timestamps: true,
    versionKey: false,
  }
);

export { userAnswerInteraction };
