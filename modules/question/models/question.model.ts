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
    }
},
  {
    strict: false,
    timestamps: true,
    versionKey: false,
  }
);

export { QuestionSchema };
