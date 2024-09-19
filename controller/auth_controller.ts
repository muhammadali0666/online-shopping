import { Auths } from "../model/auth_model";
import { Request, Response, NextFunction } from "express";

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    await Auths.create({ email, password });
    res.json({
      message: "login",
    });
  } catch (error) {
    next(error);
  }
};
