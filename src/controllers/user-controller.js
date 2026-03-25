import { StatusCodes } from "http-status-codes";
import asyncHandler from "../utils/async-handler/index.js";
import sendResponse from "../utils/send-response/index.js";

import {
    followUserService,
    getUserProfileService
} from "../services/user.service.js";


export const followUserController =
asyncHandler(async (req, res) => {

    const currentUserId =
        req.user.userId;

    const { userId } =
        req.params;

    const result =
        await followUserService(
            currentUserId,
            userId
        );

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        msg: result
    });

});

export const getUserProfileController =
asyncHandler(async (req, res) => {

    const { userId } =
        req.params;

    const user =
        await getUserProfileService(
            userId
        );

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        msg: "Profile fetched",
        data: user
    });

});