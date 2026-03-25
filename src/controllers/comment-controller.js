import { StatusCodes } from "http-status-codes";
import asyncHandler from "../utils/async-handler/index.js";
import sendResponse from "../utils/send-response/index.js";
import {
    addCommentService,
    deleteCommentService
} from "../services/comment-service.js";


export const addCommentController =
asyncHandler(async (req, res) => {

    const userId = req.user.userId;

    const { postId } = req.params;

    const { text } = req.body;

    const comment =
        await addCommentService(
            userId,
            postId,
            text
        );

    return sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        msg: "Comment added",
        data: comment
    });

});


export const deleteCommentController =
asyncHandler(async (req, res) => {

    const userId = req.user.userId;

    const { commentId } =
        req.params;

    await deleteCommentService(
        commentId,
        userId
    );

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        msg: "Comment deleted"
    });

});