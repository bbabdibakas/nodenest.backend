import {Request, Response, NextFunction} from "express";
import ApiError from "../exceptions/apiError";
import {HostService} from "../../application/services/HostService";
import {HostStatus} from "../../core/entities/Host";

export interface GetHostByIdDTO {
    id: string;
}

export interface CreateHostDTO {
    hostId: number,
    name: string,
    status: HostStatus,
    created: Date,
    ip: string,
    isIpBlocked: boolean,
    isUnreachable: boolean | null,
    isConfigFileExists: boolean | null,
    wabaHealthStatusCode: number | null,
}

export class HostController {
    constructor(private hostService: HostService) {
    }

    async getHosts(req: Request, res: Response, next: NextFunction) {
        try {
            const hosts = await this.hostService.getHosts()
            res.status(200).json(hosts)
        } catch (e) {
            next(e)
        }
    }

    async getHostById(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                id
            } = req.params || {}

            const idNumber = Number(id);

            if (isNaN(idNumber) || idNumber <= 0) {
                next(ApiError.BadRequest('host id must be a number'));
                return
            }

            const host = await this.hostService.getHostById(idNumber)

            if (!host) {
                next(ApiError.NotFound("Host not found"));
                return
            }
            res.status(200).json(host)
        } catch (e) {
            next(e)
        }
    }

    async createHost(
        req: Request<Record<string, never>, {}, CreateHostDTO>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const {
                hostId,
                name,
                status,
                created,
                ip,
            } = req.body || {}

            if (!hostId || !name || !status || !created || !ip) {
                next(ApiError.BadRequest("All data are required"));
                return
            }
            const existedHostByHostId = await this.hostService.getHostByHostId(hostId);

            if (existedHostByHostId) {
                next(ApiError.BadRequest("Host already exists"));
                return
            }

            const existedHostByName = await this.hostService.getHostByName(name);

            if (existedHostByName) {
                next(ApiError.BadRequest("Host already exists"));
                return
            }

            const existedHostByIp = await this.hostService.getHostByIp(ip);

            if (existedHostByIp) {
                next(ApiError.BadRequest("Host already exists"));
                return
            }

            const userData = await this.hostService.createHost(req.body)
            res.status(200).json(userData)
        } catch (e) {
            next(e)
        }
    }
}