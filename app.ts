import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middleware/error.middleware";
import connectDb from "./database/config";
import authRouter from "./router/auth_router";
import multer, { StorageEngine } from "multer"
import path from "path";

const app: Application = express();

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

///////////////// image storage engine

const storage:StorageEngine = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
  
  const upload = multer({ storage: storage });
  
  app.use(
    "/images",
    express.static("upload/images")
  );
  
  app.post("/upload", upload.single("product"), (req: Request, res: Response) => {
    res.json({
      success: 1,
      image_url: `http://localhost:${PORT}/images/${req?.file?.filename}`,
    });
  });


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
