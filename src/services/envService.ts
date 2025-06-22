import dotenv from "dotenv";
dotenv.config();

export class EnvService {
    private readonly port: number;

    constructor() {
        if (!process.env.PORT) throw new Error('PORT is not defined');

        this.port = Number(process.env.PORT);
    }

    get PORT() {
        return this.port;
    }
}