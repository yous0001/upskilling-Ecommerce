import chalk from "chalk";
import mongoose from "mongoose";


export const db_connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(chalk.green("Database connected"));
    } catch (err) {
        console.log(err);
    }
}