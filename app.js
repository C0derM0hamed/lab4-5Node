import express from "express";
import dbConnect from "./Database/dbConnect.js";
import postModel from "./Database/Models/post.model.js";
import PostRoutes from "./Modules/Posts/post.routes.js";
import userModel from "./Database/Models/user.model.js";
import userRouter from "./Modules/Users/user.routes.js";
import CommentModel from "./Database/Models/comment.model.js";
import commentRouter from "./Modules/comments/comment.routes.js";



// 1 create server 
const app = express();
app.use(express.json());

app.use(userRouter);
app.use(PostRoutes);
app.use(commentRouter);


dbConnect;
userModel;
postModel;
CommentModel;


const Port = process.env.Port || 3000;

// 2 listen to server
app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
});