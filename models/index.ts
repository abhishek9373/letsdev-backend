import mongoose, { Document } from "mongoose";

// import all schemas here
import { userSchema } from "../modules/user/models/User";
import { SessionSchema } from "./session";
import { LocationSchema } from "./Location";
import { FileSchema } from "../modules/file/models/File";
import { PostSchema } from "../modules/post/models/Post";
import { PostPreferenceSchema } from "../modules/post/models/PostPreferences";
import { EmailSession as EmailSessionSchema } from "../modules/user/models/EmailSession";

export const schemas: any  = {
  // list of all schemas
  User: userSchema,
  Session: SessionSchema,
  Location: LocationSchema,
  File: FileSchema,
  Post: PostSchema,
  PostPreference: PostPreferenceSchema,
  EmailSession : EmailSessionSchema
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
