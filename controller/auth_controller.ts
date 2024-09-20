import BaseError from "../utils/base_error";
import { Auths } from "../model/auth_model";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
dotenv.config()

export const verifyCode = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
        const { verify, email } = req.body;

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

export const login = async (req: Request, res: Response, next: NextFunction):Promise<Response | void> => {
    try {
        const { email, password } = req.body;

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
