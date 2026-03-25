import { StatusCodes } from "http-status-codes";
import asyncHandler from "../utils/async-handler/index.js";
import sendResponse from "../utils/send-response/index.js";

import {
    createPostService,
    getFeedService,
    deletePostService,
    likePostService
} from "../services/post-service.js";

export const createPostController =
asyncHandler(async (req, res) => {

    const userId =
        req.user.userId;

    const { content } =
        req.body;

    const file =
        req.file;

    const post =
        await createPostService(
            userId,
            content,
            file
        );

    return sendResponse(res, {

        statusCode:
        StatusCodes.CREATED,

        success: true,

        msg: "Post created",

        data: post

    });

});

export const getFeedController =
asyncHandler(async (req, res) => {

    const posts =
        await getFeedService();

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        msg: "Feed fetched successfully",
        data: posts

    });

});

export const likeUnlikeController =
asyncHandler(async (req, res) => {

    const userId =
        req.user.userId;

    const { postId } =
        req.params;

    const result =
        await likeAndUnlike(
            postId,
            userId
        );

    return sendResponse(res, {

        statusCode:
        StatusCodes.OK,

        success: true,

        msg: `Post ${result}`

    });

});


export const deletePostController =
asyncHandler(async (req, res) => {

    const userId = req.user.userId;

    const { postId } = req.params;

    await deletePostService(
        postId,
        userId
    );

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        msg: "Post deleted"
    });

});

export const likePostController =
asyncHandler(async (req, res) => {

    const userId = req.user.userId;

    const { postId } = req.params;

    const result =
        await likePostService(
            postId,
            userId
        );

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        msg: result
    });

});