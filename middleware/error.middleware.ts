import BaseError from "../error/base_error";
import { Request, Response, NextFunction } from "express";

export default function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  console.log(err);
  if (err instanceof BaseError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Server error" });
}
