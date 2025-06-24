import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const app=express();
const port=process.env.PORT || 3000;

app.use(express.json());




app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API not found',
  });
});

app.listen(port,()=>{
    console.log(chalk.bgGreen("server is running on port",port));
})