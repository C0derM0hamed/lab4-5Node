import userModel from "../Database/Models/user.model.js"


export const checkEmail =async (req,res,next) => {
    console.log('checkEmail middleware - req.path:', req.path, 'req.body:', req.body);
    let foundUser = await userModel.findOne({email: req.body.email})
    console.log('checkEmail middleware - foundUser:', foundUser);
    console.log('checkEmail middleware - req.path:', req.path, 'req.body:', req.body);
    if (req.path.endsWith('/signup')) {
        if (foundUser) {
            return res.status(409).json({ message: 'email already exist' });
        } else {
            return next();
        }
    }
    if (req.path.endsWith('/signin')) {
        if (foundUser) {
            req.foundUser = foundUser;
            return next();
        } else {
            return res.status(422).json({ message: 'User not found, please signup' });
        }
    }
    // fallback for other routes
    req.foundUser = foundUser;
    next();
    }

