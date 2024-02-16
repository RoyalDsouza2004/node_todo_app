import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
      path: "./data/config.env"
})

//middlewear
app.use(express.json());
app.use(cookieParser());
app.use(cors({
      origin:[process.env.FRONTENT_URL],
      methods:["GET" , "POST" , "PUT" , "DELETE"],
      credentials:true,
}));

//importing route
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.get('/', (req, res) => {
      res.send("Nice working");
})

//using error middleware
app.use(errorMiddleware);
