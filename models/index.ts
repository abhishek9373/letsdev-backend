import mongoose, { Document, model } from "mongoose";

// import all schemas here
import { userSchema } from "../modules/user/models/User";
import { SessionSchema } from "./session";
import { LocationSchema } from "./Location";
import { FileSchema } from "../modules/file/models/File";
import { PostSchema } from "../modules/post/models/Post";
import { PostPreferenceSchema } from "../modules/post/models/PostPreferences";
import { EmailSession as EmailSessionSchema } from "../modules/user/models/EmailSession";
import { UserPostInteractionsSchema } from "../modules/post/models/UserPostInteractions";
import { PostCommentsSchema } from "../modules/post/models/PostComments";
import { UserCommentInteractionsSchema } from "../modules/post/models/UserCommentInteraction";
import { QuestionSchema } from "../modules/question/models/question.model";
import { AnswerSchema } from "../modules/question/models/answer.model";
import { userQuestionInteraction } from "../modules/question/models/userQuestionInteraction";

export const schemas: any  = {
  // list of all schemas
  User: userSchema,
  Session: SessionSchema,
  Location: LocationSchema,
  File: FileSchema,
  Post: PostSchema,
  PostPreference: PostPreferenceSchema,
  EmailSession : EmailSessionSchema,
  UserPostInteraction: UserPostInteractionsSchema,
  PostComment: PostCommentsSchema,
  UserCommentInteraction: UserCommentInteractionsSchema,
  Question: QuestionSchema,
  Answer: AnswerSchema,
  UserQuestionInteraction: userQuestionInteraction
};

const models:any = {};
Object.keys(schemas).forEach((schemaName) => {
  const schema = schemas[schemaName];
  // Store the schema in the `models` object
  models[schemaName] = mongoose.model<Document>(schemaName, schema);
});

export const User = models.User;
export const Session = models.Session;
export const Location = models.Location;
export const File = models.File;
export const Post = models.Post;
export const PostPreference = models.PostPreference;
export const EmailSession = models.EmailSession;
export const UserPostInteraction = models.UserPostInteraction;
export const PostComment = models.PostComment;
export const UserCommentInteraction = models.UserCommentInteraction;
export const Question = models.Question;
export const Answer = models.Answer;
export const UserQuestionInteraction = models.UserQuestionInteraction;
