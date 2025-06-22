import {NextFunction, Request, Response} from "express";
import ApiError from "../exceptions/apiError";
import {TokenService} from "../services/tokenService";

const tokenService = new TokenService();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError('Not authorized.'));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError('Not authorized.'));
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError('Not authorized.'));
        }

        next();
    } catch (e) {
        next(ApiError.UnauthorizedError('Not authorized.'));
    }
}

export default authMiddleware;