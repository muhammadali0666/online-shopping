import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middleware/error.middleware";
import connectDb from "./database/config";
import authRouter from "./router/auth_router";

const app = express();

dotenv.config()
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

connectDb()

///////////////////////// router

app.use(authRouter)

//////////// error middleware

app.use(errorHandler);
app.get("/", (_: Request, res: Response) => {
  res.json("success");
});


app.listen(PORT, () => {
  console.log(`Application running at http://localhost:${PORT}`);
});
