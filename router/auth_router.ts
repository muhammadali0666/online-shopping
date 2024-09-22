import { Router } from "express";
import { login, register, verifyCode } from "../controller/auth_controller";

const authRouter: Router = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/verify_code", verifyCode);

export default authRouter;
