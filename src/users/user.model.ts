import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema(
  {
    name: String,
    email: String
  },
  {
    timestamps: true
  }
);
