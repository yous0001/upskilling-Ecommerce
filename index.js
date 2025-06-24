import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import { db_connection } from "./src/config/db-connection.js";

dotenv.config();

const app=express();
const port=process.env.PORT || 3000;

app.use(express.json());

//app.use("/api/v1",userRoutes);



app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API not found',
  });
});
db_connection();
app.listen(port,()=>{
    console.log(chalk.bgGreen("server is running on port",port));
})