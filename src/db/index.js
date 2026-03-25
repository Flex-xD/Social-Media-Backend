import mongoose from "mongoose";
import statusCodes from "http-status-codes";
import ApiError from "../utils/api-error/index.js";
import { logger } from "../utils/winston/index.js"

const connectDb = async (req, res) => {
    try {
        const mongodb_uri = process.env.MONGODB_URI;
        if (!mongodb_uri) {
            throw ApiError(statusCodes.INTERNAL_SERVER_ERROR, "Mongodb uri not defined !");
        }
        const conn = await mongoose.connect(mongodb_uri);
        console.log(`Server connected to DB : 🟢 ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error while connecting to the DB : ${error}`);
    }
}

export default connectDb;