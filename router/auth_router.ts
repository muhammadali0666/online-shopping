import { Router } from "express";
import { login, register, verifyCode } from "../controller/auth_controller";

const authRouter: Router = Router();
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user, sends a verification code via email.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Pa$$w0rd
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: User has been registered, please check your Gmail inbox
 *                 email:
 *                   type: string
 *                   example: john@example.com
 *       '400':
 *         description: Bad Request (e.g., user already exists, invalid password)
 *       '500':
 *         description: Server Error
 */
authRouter.post("/register", register);

/**
 * @swagger
 * /verifyCode:
 *   post:
 *     summary: Verify user email
 *     description: Verifies the user using the code sent via email.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               verify:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       '201':
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Success
 *                 result:
 *                   type: string
 *                   example: JWT_TOKEN
 *       '400':
 *         description: Bad Request (e.g., wrong verification code, user not found)
 *       '500':
 *         description: Server Error
 */
authRouter.post("/login", login);


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in user
 *     description: Logs in the user if the email and password match, and if the email is verified.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Pa$$w0rd
 *     responses:
 *       '201':
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Success
 *                 result:
 *                   type: string
 *                   example: JWT_TOKEN
 *       '400':
 *         description: Bad Request (e.g., email not found, wrong password, not verified)
 *       '500':
 *         description: Server Error
 */
authRouter.post("/verify_code", verifyCode);

export default authRouter;
