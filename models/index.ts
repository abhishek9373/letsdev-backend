import mongoose, { Model, Document, Schema } from "mongoose";

// import all schemas here

interface IModels {
  // define interface for models
  Schema1: Model<Document>;
  Schema2: Model<Document>;
  Schema3: Model<Document>;
}

const schemas: { [key: string]: Schema } = {
  // list of all schemas
};

const models:any = {};
Object.keys(schemas).forEach((schemaName) => {
  const schema = schemas[schemaName];
  // Store the schema in the `models` object
  models[schemaName] = mongoose.model<Document>(schemaName, schema);
});

export default models;
