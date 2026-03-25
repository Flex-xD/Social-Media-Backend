import { StatusCodes } from "http-status-codes";
import asyncHandler from "../utils/async-handler/index.js";
import sendResponse from "../utils/send-response/index.js";
import {
    registerService,
    loginService,
    logoutService,
    createToken
} from "../services/auth.service.js";

const maxAge = 7 * 24 * 60 * 60 * 1000;

export const registerController = asyncHandler(
    async (req, res) => {

        const { email, username, password } = req.body;

        const user = await registerService({
            email,
            username,
            password
        });

        const token = createToken(
            user._id,
            user.email
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development' ? true : false ,
            sameSite: "none",
            maxAge,
            path: "/"
        });

        console.log("User Registered!");

        return sendResponse(res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            msg: "User Registered!",
            data: user
        });
    }
);

export const loginController = asyncHandler(
    async (req, res) => {

        const { email, username, password } = req.body;

        const user = await loginService({
            email,
            username,
            password
        });

        if (req.cookies.token) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/"
            });
        }

        const token = createToken(
            user._id,
            user.email
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development' ? true : false ,
            sameSite: "none",
            maxAge,
            path: "/"
        });

        console.log("User Logged In!");

        return sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            msg: "User logged in!",
            data: user
        });
    }
);

export const logoutController = asyncHandler(
    async (req, res) => {

        await logoutService();

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development' ? true : false ,
            sameSite: "none",
            path: "/"
        });

        console.log("User Logged Out!");

        return sendResponse(res, {
            statusCode: StatusCodes.OK,
            success: true,
            msg: "User logged out!"
        });
    }
);