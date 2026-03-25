import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import sendError from "./utils/error-handler/index.js";
import connectdb from "./db/index.js"
import authRoutes from "./routes/auth-routes.js"
import postRoutes from "./routes/post-routes.js";
import commentRoutes from "./routes/comment-routes.js";
import userRoutes from "./routes/user-routes.js";

dotenv.config();


const port = process.env.PORT || 4000;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use((err , req, res, next) => {
    return sendError(res ,{err});
})

app.use("/api/auth-routes" , authRoutes);
app.use("/api/post-routes" ,postRoutes);
app.use("/api/comment-routes" , commentRoutes);

// ? I have to update user profile's logic in order to get the image also
app.use("/api/user-routes" , userRoutes);





app.listen(port , async () => {
    await connectdb();
    console.log(`Server running on port : ✅ ${port}`);
})