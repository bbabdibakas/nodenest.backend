import {JwtPayload} from "jsonwebtoken";

export interface JWTPayloadDTO extends JwtPayload {
    id: number,
    name: string,
    username: string,
    createdAt: Date,
    updatedAt: Date,
}