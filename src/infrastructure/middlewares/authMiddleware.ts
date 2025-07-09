import {NextFunction, Request, Response} from "express";
import ApiError from "../exceptions/apiError";
import {TokenService} from "../../application/services/TokenService";
import {EnvService} from "../../application/services/EnvService";
import {container} from "tsyringe";

export const authMiddleware = () => {
    const tokenService = container.resolve(TokenService);
    const envService = container.resolve(EnvService);

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader) {
                return next(ApiError.UnauthorizedError('Not authorized.'));
            }

            const accessToken = authorizationHeader.split(' ')[1];
            if (!accessToken) {
                return next(ApiError.UnauthorizedError('Not authorized.'));
            }

            if (accessToken === envService.APP_API_KEY) {
                return next()
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
}