import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the Auth document
interface IAuth extends Document {
  username: string;
  email: string;
  password: string;
  role?: string;
  verify?: string;
  verified?: boolean;
}


const AuthSchema: Schema<IAuth> = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  verify: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

export const Auths = mongoose.model<IAuth>("User", AuthSchema);
