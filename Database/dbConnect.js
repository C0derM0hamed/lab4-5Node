import mongoose from "mongoose";


//connect db
const dbURI = 'mongodb+srv://Mo123:M123d@cluster0.y975glx.mongodb.net/?appName=Cluster0';
const connectDB =
    mongoose.connect(dbURI)
        .then(() => {
            console.log("DB connected");
        })
        .catch((err) => {
            console.log(err);
        });

export default connectDB;