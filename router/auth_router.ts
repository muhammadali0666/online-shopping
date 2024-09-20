import { Router } from "express";
import { login, verifyCode } from "../controller/auth_controller";

const authRouter: Router = Router();

authRouter.post("/login", login);
authRouter.post("/verify_code", verifyCode);

export default authRouter;
