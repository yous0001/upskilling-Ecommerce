import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
import sendMail from "../services/sendMail.js";
import { generateVerificationEmail } from "../utils/email-templates.js";

export const registerUser = async ({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    return user;
};

export const checkLogin = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError('Invalid credentials', 401)
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new AppError('Invalid credentials', 401)
    }

    return user
}

export const createAccessToken = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRARTION })

    return accessToken
}

export const createVerificationToken = async (userId) => {

    const verificationToken = await jwt.sign({ userId }, process.env.JWT_VERIFICATION_SECRET, { expiresIn: '1d' });

    return verificationToken
}

export const sendVerificationEmail = async (user) => {
    const verificationToken = await createVerificationToken(user._id);

    const isEmailSent = await sendMail({
        to: user.email,
        subject: "Welcome to Upskilling",
        message: generateVerificationEmail({
            firstName: user.name,
            verificationLink: `http://localhost:3000/auth/verify/${verificationToken}`
        })
    })
    return isEmailSent
}

export const createRefreshToken = (userId) => {
    return jwt.sign({userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d',
    });
};