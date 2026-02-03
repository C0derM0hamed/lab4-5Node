import userModel from "../../Database/Models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { sendEmail, confirmEmailTemplate } from "../../Utils/sendEmail.js"


const signup = async (req,res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 8)
        
        // Generate confirmation token
        const confirmationToken = crypto.randomBytes(32).toString('hex')
        const confirmationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        
        req.body.confirmationToken = confirmationToken
        req.body.confirmationTokenExpires = confirmationTokenExpires
        
        let addUser = await userModel.insertMany(req.body) 
        
        // Send confirmation email
        const confirmLink = `http://localhost:${process.env.Port || 3000}/confirm/${confirmationToken}`
        const html = confirmEmailTemplate(addUser[0].name, confirmLink)
        
        await sendEmail({
            to: addUser[0].email,
            subject: "Confirm Your Email",
            html
        })
        
        addUser[0].password = undefined 
        addUser[0].confirmationToken = undefined
        res.status(201).json({message: "Account created! Please check your email to confirm.", data: addUser})
    } catch (error) {
        console.error('Signup error:', error)
        res.status(500).json({message: "Error creating account", error: error.message})
    }
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


const confirmEmail = async (req, res) => {
    try {
        const { token } = req.params
        
        const user = await userModel.findOne({
            confirmationToken: token,
            confirmationTokenExpires: { $gt: Date.now() }
        })
        
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired confirmation token" })
        }
        
        user.isConfirmed = true
        user.confirmationToken = undefined
        user.confirmationTokenExpires = undefined
        await user.save()
        
        res.status(200).json({ message: "Email confirmed successfully! You can now login." })
    } catch (error) {
        console.error('Confirm email error:', error)
        res.status(500).json({ message: "Error confirming email", error: error.message })
    }
}


export {
    signup,
    signin,
    confirmEmail
}
