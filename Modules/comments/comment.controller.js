import commentModel from "../../Database/Models/comment.model.js";


const createComment = async(req,res) => {
    req.body.user = req.user._id; // get decoded --> from middleware
    let addedComment = await commentModel.create(req.body);
    // Populate user and post details after creation
    addedComment = await commentModel.findById(addedComment._id)
        .populate("user", "name email role")
        .populate("post", "title content createdBy");
    res.status(201).json({message: "created", data: addedComment});
}


const getComments = async(req,res) => {
    const comments = await commentModel.find({user: req.user._id})
        .populate("user", "name email role")
        .populate("post", "title content createdBy");
    res.status(200).json({message: "success", data: comments});
}

const deleteComment = async(req,res) => {
    const deletedComment = await commentModel.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
    });

    if(!deletedComment){
        return res.status(404).json({message: "Comment not found or you are not the owner"});
    }

    res.status(200).json({message: "deleted", data: deletedComment});
}



export {
    createComment,
    getComments,
    deleteComment
}