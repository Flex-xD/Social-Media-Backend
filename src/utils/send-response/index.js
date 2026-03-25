import { logger } from "../winston/index.js";

const sendResponse = (res, { statusCode, success, message, data }) => {
    logger.info({
        statusCode,
        success,
        message,
        data
    }); return res.status(statusCode).json({
        statusCode,
        success,
        message,
        data
    })
}

export default sendResponse;