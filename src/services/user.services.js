import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerUser = async ({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({ name, email, password: hashedPassword });
    return user;
};