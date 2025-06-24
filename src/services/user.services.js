import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const registerUser = async ({ name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({ name, email, password: hashedPassword });
    return user;
};

export const checkLogin=async(email,password)=>{
    const user=await user.findOne({email});
    if(!user){
        throw new AppError('Invalid credentials',401)
    }
    const isPasswordMatch=await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        throw new AppError('Invalid credentials',401)
    }

    return user
}

export const createAccessToken=(userId)=>{
    accessToken=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRARTION})

    return accessToken
}