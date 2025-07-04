import User from "../models/user.model.js";
import { checkLogin, createAccessToken, createRefreshToken, registerUser, sendVerificationEmail } from "../services/user.services.js";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import jwt from 'jsonwebtoken';

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}

export const signUp = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new AppError('All fields are required', 400);
    }

    const isEmailExists = await User.findOne({ email });

    if (isEmailExists)
        throw new AppError('Email already registered', 409);
    const user = await registerUser({ name, email, password });

    const isEmailSent = await sendVerificationEmail(user);
    if (!isEmailSent) {
        await User.findByIdAndDelete(user._id);
        throw new AppError("Email not sent", 500)
    }
    res.status(201).json({
        success: true,
        message: 'User registered successfully. please verify your email',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
});

export const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    const user = await checkLogin(email, password);

    const accessToken = createAccessToken(user._id)
    const refreshToken = createRefreshToken(user._id);

    res.cookie('refreshToken', refreshToken, cookieOptions);

    res.cookie('token', accessToken, cookieOptions)
        .status(200)
        .json({
            success: true,
            message: 'User logged in successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })
})

export const refreshAccessToken = catchAsync(async (req, res, next) => {
    const token = req.cookies.refreshToken;
    if (!token) return next(new AppError('Refresh token not found', 401));

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
        return next(new AppError('Invalid or expired refresh token', 403));
    }

    const user = await User.findById(decoded.userId);
    if (!user) return next(new AppError('User not found or has been deleted', 404));


    const newAccessToken = createAccessToken(user._id);
    const newRefreshToken = createRefreshToken(user._id);

    res.cookie('accessToken', newAccessToken, accessCookieOptions)
        .cookie('refreshToken', newRefreshToken, refreshCookieOptions)
        .status(200)
        .json({
            success: true,
            message: 'Token refreshed successfully',
        });
});

export const logout = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
};

export const verifyEmail=catchAsync(async(req,res,next)=>{
    const {token}=req.params
    const decoded=jwt.verify(token,process.env.jwt_verification_secret)

    const user=await User.findById(decoded.userId)
    if(!user) return next(new AppError('User not found',404))
    if(user.isEmailVerified) return next(new AppError('Email already verified',400))
    
    user.isEmailVerified=true
    await user.save()

    res.status(200).json({
        success:true,
        message:'Email verified successfully'
    })
})

export const getProfile=catchAsync(async(req,res,next)=>{
    const user=req.user
    res.status(200).json({
        success:true,
        user
    })
})

export const getUserById=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const user=await User.findById(id)

    if(!user) return next(new AppError('User not found',404))
    
    return res.status(200).json({
        success:true,
        user
    })
})

export const updateUserById=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const {name,email,password}=req.body

    if(req.user._id.toString() !== id) 
        return next(new AppError('You are not authorized to update this user',403))

    if(!name && !email && !password) 
        return next(new AppError('At least one field is required',400))

    const user=await User.findById(id)
    if(!user) 
        return next(new AppError('User not found',404))

    if(name)user.name=name
    if(email){
        const isEmailExists=await User.findOne({email})
        if(isEmailExists) return next(new AppError('Email already exists',400))
        user.email=email
    }

    await user.save()
    res.status(200).json({
        success:true,
        message:'User updated successfully',
        user
    })
})

export const deleteUserById=catchAsync(async(req,res,next)=>{
    const {id}=req.params

    if(req.user._id !== id) 
        return next(new AppError('You are not authorized to delete this user',403))

    const user=await User.findById(id)
    if(!user) return next(new AppError('User not found',404))

    await User.findByIdAndDelete(id)
    
    res.status(200).json({
        success:true,
        message:'User deleted successfully'
    })
})