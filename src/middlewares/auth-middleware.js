import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "../utils/async-handler/index.js";
import ApiError from "../utils/api-error/index.js";
import User from "../models/User.js";


const protectRoute = asyncHandler(
    async (req, res, next) => {

        let token;

        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            throw ApiError(
                StatusCodes.UNAUTHORIZED,
                "Unauthorized access. Please login first."
            );
        }

        let decoded;

        try {

            decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        } catch (error) {

            throw ApiError(
                StatusCodes.UNAUTHORIZED,
                "Invalid or expired token."
            );

        }

        const user = await User.findById(
            decoded.userId
        ).select("-password");

        if (!user) {
            throw ApiError(
                StatusCodes.UNAUTHORIZED,
                "User not found."
            );
        }

        req.user = user;

        next();

    }
);

export default protectRoute;