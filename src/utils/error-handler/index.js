const sendError = (res, { error }) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    let stack;

    if (error instanceof Error) {
        message = error.message;

        if (error.statusCode) {
            statusCode = error.statusCode;
        }

        stack = error.stack;
    }

    return res.status(statusCode).json({
        success: false,
        message,
        stack:
            process.env.NODE_ENV === "development"
                ? stack
                : undefined,
    });
};

export default sendError;