import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    content: String,
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User" 
        },
        post: {
            type: mongoose.Types.ObjectId,
            ref: "Post" 
        }
},
{
    timestamps: true,
    versionKey: false
})
const CommentModel = mongoose.model('Comment', CommentSchema);

export default CommentModel;