import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
export const signup_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.render("signup", {
      title: "Sign up",
    });
  }
);

export const signup_post = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Username must consist of at least on character"),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    res.render("signup", {
      title: "Sign up",
    });
  }),
];
