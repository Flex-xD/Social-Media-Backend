import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import sendError from "./utils/error-handler/index.js";
import connectdb from "./db/index.js"
dotenv.config();


const port = process.env.PORT || 5000;
const app = express();


app.use(cookieParser());
app.use(express.json());
app.use((err , req, res, next) => {
    return sendError(res ,{err});
})

app.listen(port , async () => {
    await connectdb();
    console.log(`Server running on port : ✅ ${port}`);
})