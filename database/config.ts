import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    const dbUri = process.env.DB_URI;
    if (!dbUri) {
      throw new Error("DB_URI is not defined in environment variables");
    }
    await mongoose
      .connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      } as ConnectOptions)
      .then(() => console.log("MongoDB connected successfully"));
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Unknown error occurred during DB connection");
    }
  }
};

export default connectDB;
