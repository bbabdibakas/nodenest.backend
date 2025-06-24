import {Request, Response, NextFunction} from "express";
import ApiError from "../exceptions/apiError";

const errorMiddleware = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);

    if (error instanceof ApiError) {
        res.status(error.status).json({message: error.message, errors: error.errors});
        return
    }
    res.status(500).json({message: 'Unknown server error'});
}

export default errorMiddleware