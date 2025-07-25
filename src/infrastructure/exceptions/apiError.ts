class ApiError extends Error {
    public status: number;
    public errors: string[];

    constructor(status: number, message: string, errors: string[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message: string, errors: string[] = []) {
        return new ApiError(400, message, errors);
    }

    static NotFound(message: string, errors: string[] = []) {
        return new ApiError(404, message, errors);
    }

    static UnauthorizedError(message: string, errors: string[] = []) {
        return new ApiError(401, message, errors);
    }
}

export default ApiError;