import express from "express";
import { createComment, deleteComment, getComments } from "./comment.controller.js";
import { verifyToekn } from "../../Middleware/verifyToken.js";

const commentRouter = express.Router();

commentRouter.use(verifyToekn);
commentRouter.post("/comments", createComment);
commentRouter.get("/comments", getComments);
commentRouter.delete("/comments/:id", deleteComment);

export default commentRouter;