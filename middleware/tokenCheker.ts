import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import BaseError from "../utils/base_error";

interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

export const requireAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.token as string | undefined;
        if (!token) {
            throw BaseError.BadRequest("A token is required for authentication");
        }
        try {
            const decoded = jwt.verify(token, process.env.SEKRET_KEY as string) as JwtPayload
            if (!decoded) {
                throw BaseError.BadRequest("token not active");
            }
            if (decoded.role !== "admin") {
                throw BaseError.BadRequest("You are not admin")
            }
        } catch (err) {
            throw BaseError.BadRequest(
                "Invalid token you are not admin and try login or register again"
            );
        }
        next();
    } catch (err) {
        next(err)
    }
}
