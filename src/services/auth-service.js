import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/api-error/index.js";

const maxAge = 7 * 24 * 60 * 60 * 1000;

export const createToken = (userId, email) => {
    return jwt.sign(
        { userId, email },
        process.env.JWT_SECRET,
        { expiresIn: maxAge }
    );
};

export const registerService = async ({ email, username, password }) => {

    if (!email || !username || !password) {
        throw ApiError(
            StatusCodes.BAD_REQUEST,
            "Email, username and password are required!"
        );
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        if (existingUser.email === email) {
            throw ApiError(
                StatusCodes.BAD_REQUEST,
                "Email already exists!"
            );
        }

        throw ApiError(
            StatusCodes.BAD_REQUEST,
            "Username already exists!"
        );
    }

    const usernameRegex = /^[a-z_.]+$/;

    if (!usernameRegex.test(username)) {
        throw ApiError(
            StatusCodes.CONFLICT,
            "Username can only contain lowercase letters, underscores (_), and dots (.)"
        );
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/;

    if (!passwordRegex.test(password)) {
        throw ApiError(
            StatusCodes.BAD_REQUEST,
            "Password must contain at least one letter and one number!"
        );
    }

    const user = await User.create({
        email,
        username,
        password,
        profilePicture: {
            url: "",
            width: 0,
            height: 0,
            publicId: "",
            format: ""
        },
        following: [],
        followers: [],
        bio: "",
        post: []
    });

    return user;
};


export const loginService = async ({ email, username, password }) => {

    if ((!email && !username) || !password) {
        throw ApiError(
            StatusCodes.BAD_REQUEST,
            "Email/Username and password are required!"
        );
    }

    const user = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (!user) {
        throw ApiError(
            StatusCodes.BAD_REQUEST,
            "User does not exist!"
        );
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw ApiError(
            StatusCodes.BAD_REQUEST,
            "Invalid credentials!"
        );
    }

    return user;
};


export const logoutService = async () => {
    return true;
};