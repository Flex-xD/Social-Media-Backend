import User from "../models/User";

export const getUserProfileService =
async (userId) => {

    const user =
        await User.findById(userId)
            .populate({
                path: "post",
                populate: {
                    path: "author",
                    select: "username"
                }
            });

    if (!user) {
        throw ApiError(
            StatusCodes.NOT_FOUND,
            "User not found"
        );
    }

    return user;
};