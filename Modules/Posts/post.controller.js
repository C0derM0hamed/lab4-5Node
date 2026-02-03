
import PostModel from "../../Database/Models/post.model.js";

const getPosts = async (req,res) => {
    let Posts = await PostModel.find();
    res.json({message: "success", data: Posts})
}



const createPost = async(req,res) => {
    req.body.createdBy = req.user._id; 
    let addedPost = await PostModel.create(req.body);
    res.status(201).json({message: "created", data: addedPost});
}

const updatePost =  async(req,res) => {
    let id= req.params.id; 
    let PostUpdate = await PostModel.findByIdAndUpdate(id, req.body, {new: true})
    res.status(200).json({message: "updated Post", data: PostUpdate})
}



const deletePost = async(req,res) => {
    const deletedPost = await PostModel.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.user._id
    });

    if(!deletedPost){
        return res.status(404).json({message: "Post not found or you are not the owner"});
    }

    res.status(200).json({message: "deleted", data: deletedPost});
}


const getPostById = async (req, res) => {
    let id = req.params.id;
    let Post = await PostModel.findById(id);
    if (!Post) {
        return res.status(404).json({message: "Post not found"});
    }
    res.status(200).json({message: "success", data: Post});
}


export {getPosts, createPost, updatePost, deletePost, getPostById}