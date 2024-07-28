import * as dotenv from "dotenv";
dotenv.config()
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";

import morgan from "morgan";

const app = express();

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("DB connected")).catch((err) => console.log("DB connection error: ", err));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:8081',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(morgan("dev"));

app.use("/api", authRoutes);
app.use("/api", todoRoutes);

app.listen(8000, () => console.log("Server running on port 8000"));