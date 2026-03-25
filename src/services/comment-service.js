import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/api-error/index.js";

export const addCommentService = async (
    userId,
    postId,
    text
) => {

    if (!text) {
        throw ApiError(
            StatusCodes.BAD_REQUEST,
            "Comment text required"
        );
    }

    const post = await Post.findById(postId);

    if (!post) {
        throw ApiError(
            StatusCodes.NOT_FOUND,
            "Post not found"
        );
    }

    const comment = await Comment.create({
        post: postId,
        author: userId,
        text
    });

    await Post.findByIdAndUpdate(
        postId,
        {
            $push: { comments: comment._id }
        }
    );

    return comment;
};

export const deleteCommentService = async (
    commentId,
    userId
) => {

    const comment =
        await Comment.findById(commentId);

    if (!comment) {
        throw ApiError(
            StatusCodes.NOT_FOUND,
            "Comment not found"
        );
    }

    if (
        comment.author.toString()
        !== userId
    ) {
        throw ApiError(
            StatusCodes.FORBIDDEN,
            "Not authorized"
        );
    }

    await Comment.findByIdAndDelete(
        commentId
    );

    await Post.findByIdAndUpdate(
        comment.post,
        {
            $pull: { comments: commentId }
        }
    );

    return true;
};