import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    },
    votes: { 
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

export { AnswerSchema };
