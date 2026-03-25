import Post from "../models/Post.js";
import User from "../models/User.js";
import { uploadImageService }
    from "./upload-service.js";

import { StatusCodes }
    from "http-status-codes";

import ApiError
    from "../utils/api-error/index.js";

export const createPostService =
    async (
        userId,
        content,
        file
    ) => {

        if (!content && !file) {

            throw ApiError(
                StatusCodes.BAD_REQUEST,
                "Post must contain text or image"
            );

        }

        let imageData = null;

        if (file) {

            imageData =
                await uploadImageService(
                    file.buffer
                );

        }

        const post =
            await Post.create({

                author: userId,

                content,

                image: imageData

            });

        await User.findByIdAndUpdate(
            userId,
            {
                $push: { post: post._id }
            }
        );

        return post;
    };

export const getFeedService = async () => {
    const posts = await Post.find()
        .populate({
            path: "author",
            select: "username"
        });

    return posts;
}

export const likePostService = async (postId, userId) => {
    const post =
        await Post.findById(postId);
    if (!post) {
        throw ApiError(
            StatusCodes.NOT_FOUND,
            "Post not found"
        );
    }

    if (post.likes.includes(userId)) {
        await Post.findByIdAndUpdate(postId , {
            $pull:{
                likes:userId
            }
        })
        return "unliked";
    }
    await Post.findByIdAndUpdate(postId ,  {
        $push:{
            likes:userId
        }
    })
}

export const deletePostService =
    async (
        postId,
        userId
    ) => {

        const post =
            await Post.findById(postId);

        if (!post) {

            throw ApiError(
                StatusCodes.NOT_FOUND,
                "Post not found"
            );

        }


        if (
            post.author.toString()
            !== userId
        ) {

            throw ApiError(
                StatusCodes.FORBIDDEN,
                "Not authorized to delete"
            );

        }

        if (post.image?.publicId) {

            await cloudinary
                .uploader
                .destroy(
                    post.image.publicId
                );

        }
        await Comment.deleteMany({
            post: postId
        });

        await Post.findByIdAndDelete(
            postId
        );

        await User.findByIdAndUpdate(
            userId,
            {
                $pull: { post: postId }
            }
        );


        return true;

    };