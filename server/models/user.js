import mongoose from "mongoose";

const { Schema } = mongoose;

// structure of the document
const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

// create a model from the schema to get methods to interact with mongodb
export const UserModel = mongoose.model("User", userSchema);
