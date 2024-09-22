import BaseError from "../utils/base_error";
import { Auths } from "../model/auth_model";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import { ILogin, IRegister, IVerifyCode } from "../dto";
import nodemailer from "nodemailer"
dotenv.config()

export const register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { username, email, password } = req.body as IRegister
        const user = await Auths.findOne({ email: email });
        if (user) {
            throw BaseError.BadRequest("user already exists");
        }
        ///////////////////////////// nodemailer
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.GOOGLE_PASSKEY,
            },
        });

        let randomNumbers:string = "";

        for (let i = 0; i < 6; i++) {
          let randomNumber = Math.floor(Math.random() * 10);
          randomNumbers += randomNumber;
        }

        let mailOptions = {
            from: process.env.GMAIL,
            to: `${email}`,
            subject: "from cookies",
            html: `<b> your verification code is <span style="color: blue; font-size: 25px;">${randomNumbers}</span></b>`,
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        /////////////////////////////

        if (!password.trim()) {
            throw BaseError.BadRequest("Password invalid");
        }

        let hash = await bcrypt.hash(password, 12);

        await Auths.create({ username, email, password: hash, verify: randomNumbers });

        return res.status(201).json({
            status: 201,
            message: "User has been registered please check your gmail inbox",
            email,
        });
    } catch (error) {
        next(error)
    }
}

export const verifyCode = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { verify, email } = req.body as IVerifyCode;

        const user = await Auths.findOne({ email: email });

        if (!user) {
            throw BaseError.BadRequest("User not found");
        }
        if (user.verify !== verify) {
            throw BaseError.BadRequest("verify code mistake or you must be refresh and try again");
        }

        if (user.verify === verify) {
            await Auths.findByIdAndUpdate(user._id, { verified: true });
            let token = await jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.SEKRET_KEY as string,
                {
                    expiresIn: process.env.TIME as string,
                }
            );
            return res.status(201).send({
                status: 201,
                message: "Success",
                result: token,
            });
        }
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { email, password } = req.body as ILogin;

        let user = await Auths.findOne({ email: email });

        if (!user) {
            throw BaseError.BadRequest("Email not found");
        }
        let founEmail = user.email === email;

        if (!founEmail) {
            throw BaseError.BadRequest("You have not registered");
        }

        let check = await bcrypt.compare(password, user.password);

        if (check && user.verified === true) {
            let token = await jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.SEKRET_KEY as string,
                {
                    expiresIn: process.env.SEKRET_KEY as string,
                }
            );
            return res.status(201).json({
                status: 201,
                message: "Success",
                result: token,
            });
        } else {
            throw BaseError.BadRequest(
                "Password wrong or you are not veriy your code"
            );
        }
    } catch (error) {
        next(error);
    }
};
