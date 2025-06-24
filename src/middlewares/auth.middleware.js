import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { AppError } from '../utils/AppError.js';

export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return next(new AppError('Not authenticated', 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return next(new AppError('User no longer exists', 401));
        }

        req.user = user;
        next();
    } catch (err) {
        return next(new AppError('Invalid or expired token', 401));
    }
};