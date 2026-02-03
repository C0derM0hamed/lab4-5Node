import express from "express";
import { signup, signin, confirmEmail } from "./user.controller.js";
import { checkEmail } from "../../Middleware/chechEmail.js";

const userRouter = express.Router()


userRouter.post("/signup", checkEmail, signup);

userRouter.post("/signin", checkEmail, signin)

userRouter.get("/confirm/:token", confirmEmail)


export default userRouter;