import express from "express"
import { getPosts, createPost, updatePost, deletePost,getPostById } from "./post.controller.js";
import { verifyToekn } from "../../Middleware/verifyToken.js";

const PostRoutes = express.Router();

PostRoutes.use(verifyToekn)

PostRoutes.get("/Posts", getPosts)
PostRoutes.get("/Posts/:id", getPostById)
PostRoutes.post("/Posts",createPost)
PostRoutes.patch("/Posts/:id", updatePost)
PostRoutes.delete("/Posts/:id", deletePost)


export default PostRoutes
