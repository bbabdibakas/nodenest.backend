import {Request, Response, NextFunction} from "express";
import ApiError from "../exceptions/apiError";
import {HostService} from "../../application/services/HostService";
import {HostStatus} from "../../core/entities/Host";

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

export interface ActualizeHostsDTO {
    hosts: CreateHostDTO[];
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

    async actualizeHosts(
        req: Request<Record<string, never>, {}, ActualizeHostsDTO>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const {
               hosts
            } = req.body || {}

            if (!hosts || !hosts.length) {
                next(ApiError.BadRequest("at least one host required"));
                return
            }

            const actualizedHosts = await this.hostService.actualizeHosts(hosts)
            res.status(200).json(actualizedHosts)
        } catch (e) {
            next(e)
        }
    }
}