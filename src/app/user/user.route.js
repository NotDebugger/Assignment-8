import { Router } from "express";
import * as userController from "./user.controller.js";

export const userRouter = Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.patch("/:id", userController.updateUserInfo);
userRouter.delete("/:id", userController.deleteUser);
userRouter.get("/:id", userController.getUserById);
