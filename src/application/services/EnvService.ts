import dotenv from "dotenv";
dotenv.config();

export class EnvService {
    private readonly jwtAccessSecret: string;
    private readonly jwtRefreshSecret: string;
    private readonly port: number;
    private readonly hetznerApiUrl: string;
    private readonly hetznerApiKey: string;
    private readonly app_api_key: string;

    constructor() {
        if (!process.env.JWT_ACCESS_SECRET) throw new Error('JWT_ACCESS_SECRET is not defined');
        if (!process.env.JWT_REFRESH_SECRET) throw new Error('JWT_REFRESH_SECRET is not defined');
        if (!process.env.PORT) throw new Error('PORT is not defined');
        if (!process.env.HETZNER_API_URL) throw new Error('HETZNER_API_URL is not defined');
        if (!process.env.HETZNER_API_KEY) throw new Error('HETZNER_API_KEY is not defined');
        if (!process.env.APP_API_KEY) throw new Error('APP_API_KEY is not defined');

        this.jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
        this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
        this.port = Number(process.env.PORT);
        this.hetznerApiUrl = process.env.HETZNER_API_URL;
        this.hetznerApiKey = process.env.HETZNER_API_KEY;
        this.app_api_key = process.env.APP_API_KEY;
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

    get HETZNER_API_URL() {
        return this.hetznerApiUrl;
    }

    get HETZNER_API_KEY() {
        return this.hetznerApiKey;
    }

    get APP_API_KEY() {
        return this.app_api_key;
    }
}