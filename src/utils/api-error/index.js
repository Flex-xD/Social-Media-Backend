const ApiError = (
    statusCode,
    message = "Something went wrong",
    errors = []
) => {
    const error = new Error(message);

    error.statusCode = statusCode;
    error.success = false;
    error.errors = errors;

    // ? See if this console is needed
    console.log(`error : ${{statusCode , errors}}`);
    return error;
};

export default ApiError;