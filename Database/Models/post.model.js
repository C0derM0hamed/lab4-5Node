import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema({
    title: String,
    content: String,
    createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User" 
}
},
{
    timestamps: true,
    versionKey: false
})
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;