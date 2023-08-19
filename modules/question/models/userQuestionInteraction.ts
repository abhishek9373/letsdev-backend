import mongoose from 'mongoose';

const userQuestionInteraction = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    questionId: {
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

export { userQuestionInteraction };
