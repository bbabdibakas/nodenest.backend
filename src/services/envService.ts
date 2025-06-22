import dotenv from "dotenv";
dotenv.config();

export class EnvService {
    private readonly jwtAccessSecret: string;
    private readonly jwtRefreshSecret: string;
    private readonly port: number;

    constructor() {
        if (!process.env.JWT_ACCESS_SECRET) throw new Error('JWT_ACCESS_SECRET is not defined');
        if (!process.env.JWT_REFRESH_SECRET) throw new Error('JWT_REFRESH_SECRET is not defined');
        if (!process.env.PORT) throw new Error('PORT is not defined');

        this.jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
        this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
        this.port = Number(process.env.PORT);
    }

    get JWT_ACCESS_SECRET() {
        return this.jwtAccessSecret;
    }

    get JWT_REFRESH_SECRET() {
        return this.jwtRefreshSecret;
    }

    get PORT() {
        return this.port;
    }
}