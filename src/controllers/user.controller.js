import User from "../models/user.model.js";
import { checkLogin, createAccessToken, createRefreshToken, createVerificationToken, registerUser, sendVerificationEmail } from "../services/user.services.js";
import { AppError } from "../utils/AppError.js";
import { catchAsync } from "../utils/catchAsync.js";
import  jwt  from 'jsonwebtoken';

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

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        
        const user= await User.findById(decoded.userId);
        if(!user) return next(new AppError('user not found or have been deleted', 404));

        const newAccessToken = createAccessToken(decoded.userId);

        res.cookie('token', newAccessToken, cookieOptions)
            .status(200)
            .json({
                success: true,
                message: 'token refreshed successfully'
            })
    } catch (err) {
        return next(new AppError('Invalid or expired refresh token', 403));
    }
})