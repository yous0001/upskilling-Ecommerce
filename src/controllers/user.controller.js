import User from "../models/user.model.js";
import { checkLogin, registerUser } from "../services/user.services.js";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const signUp = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new AppError('All fields are required', 400);
    }

    const isEmailExists = await User.findOne({ email });

    if (isEmailExists)
        throw new AppError('Email already registered', 409);
    const user = await registerUser({ name, email, password });


    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
});

export const login=async(req,res,next)=>{
    const{email,password}=req.body
    const user = await checkLogin(email,password);

    const accessToken=await createAccessToken(user._id)
    
    res.status(200).json({
        success:true,
        message:"User logged in successfully",
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        },
        accessToken
    })

}