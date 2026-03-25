import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/api-error/index.js";

export const followUserService = async (
    currentUserId,
    targetUserId
) => {

    if (currentUserId === targetUserId) {
        throw ApiError(
            StatusCodes.BAD_REQUEST,
            "You cannot follow yourself"
        );
    }

    const targetUser =
        await User.findById(targetUserId);

    if (!targetUser) {
        throw ApiError(
            StatusCodes.NOT_FOUND,
            "User not found"
        );
    }

    const alreadyFollowing =
        targetUser.followers.includes(
            currentUserId
        );

    if (alreadyFollowing) {

        await User.findByIdAndUpdate(
            targetUserId,
            {
                $pull: {
                    followers: currentUserId
                }
            }
        );

        await User.findByIdAndUpdate(
            currentUserId,
            {
                $pull: {
                    following: targetUserId
                }
            }
        );

        return "Unfollowed";
    }

    await User.findByIdAndUpdate(
        targetUserId,
        {
            $push: {
                followers: currentUserId
            }
        }
    );

    await User.findByIdAndUpdate(
        currentUserId,
        {
            $push: {
                following: targetUserId
            }
        }
    );

    return "Followed";
};