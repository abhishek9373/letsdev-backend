import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    
},
  {
    strict: false,
    timestamps: true,
    versionKey: false,
  }
);

export { AnswerSchema };
