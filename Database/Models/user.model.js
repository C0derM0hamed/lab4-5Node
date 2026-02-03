import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 50,
        required: true
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    confirmationToken: {
        type: String
    },
    confirmationTokenExpires: {
        type: Date
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},{
    timestamps: true,
    versionKey: false,
})



const userModel = mongoose.model("User",userSchema )
export default userModel;