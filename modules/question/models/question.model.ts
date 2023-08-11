import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    title: {
      type : String,
      required: true,
    },
    output: { 
      type: String,
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
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
    },
    views: {
      type: Number,
      default: 0
    },
    votes: {
      type: Number,
      default: 0
    },
    answers: {
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

export { QuestionSchema };
