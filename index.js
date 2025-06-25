import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import { db_connection } from "./src/config/db-connection.js";
import { errorHandler } from "./src/middlewares/error-handler.middleware.js";
import { authRouter } from "./src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { userRouter } from './src/routes/user.routes.js';
import { vendorRouter } from "./src/routes/vendor.routes.js";

dotenv.config();

const app=express();
const port=process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/auth",authRouter);
app.use("/users",userRouter);
app.use("/vendor",vendorRouter);



app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API not found',
  });
});

app.use(errorHandler)
db_connection();
app.listen(port,()=>{
    console.log(chalk.bgGreen("server is running on port",port));
})