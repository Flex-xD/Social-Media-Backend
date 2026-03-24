import { logger } from "../winston"

const sendResponse = async (res, { statusCode, success, message, data }) => {
    logger.info(`response sent : ${statusCode, success, message , data}`);
}

export default sendResponse;