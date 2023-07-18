import mongoose, { Model, Document, Schema, model } from "mongoose";

// import all schemas here
import { userSchema } from "../modules/user/models/User";
import { SessionSchema } from "./session";
import { LocationSchema } from "./Location";
import { FileSchema } from "../modules/file/models/File";

const schemas: { [key: string]: Schema } = {
  // list of all schemas
  User: userSchema,
  Session: SessionSchema,
  Location: LocationSchema,
  File: FileSchema
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
