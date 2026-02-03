import userModel from "../../Database/Models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const signup = async (req,res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    let addUser = await userModel.insertMany(req.body) 
    addUser[0].password = undefined 
    res.status(201).json({message: "created", data: addUser})
}


const signin  =  async (req,res) => {
    console.log('signin controller - req.body:', req.body);
        let foundUser = req.foundUser;
        if (!foundUser) {
            foundUser = await userModel.findOne({email: req.body.email});
        }
        if (!foundUser) {
            return res.status(422).json({message: "User not found, check email or register first"});
        }
        console.log('signin controller - foundUser:', foundUser);
        let matchPass =  bcrypt.compareSync(req.body.password, foundUser.password);
        console.log('signin controller - matchPass:', matchPass);
        if(matchPass){
            let token = jwt.sign({_id: foundUser._id, role: foundUser.role, name: foundUser.name },process.env.JWT_SECRET, {expiresIn: "1h"});
            res.status(200).json({message: "Welcome in our app", data: foundUser, token: token});
        }else{
            res.status(422).json({message: "invalid password or email"});
        }
}



export {
    signup,
    signin
}
