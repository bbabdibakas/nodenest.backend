import {Request, Response, NextFunction} from "express";
import ApiError from "../exceptions/apiError";
import {injectable} from "tsyringe";
import {HostService} from "../../application/services/HostService";
import {CreateHostDTO} from "../../application/dtos/CreateHostDTO";

@injectable()
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
        req: Request<Record<string, never>, {}, {hosts: CreateHostDTO[]}>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const {
                hosts
            } = req.body || {}

            if (!hosts || !hosts.length) {
                next(ApiError.BadRequest("At least one host required"));
                return
            }

            for (const host of hosts) {
                if (!host.hostId || !host.status || !host.ip || !host.created || !host.name) {
                    next(ApiError.BadRequest("Invalid or missing fields in one or more hosts"));
                    return
                }
            }

            const actualizedHosts = await this.hostService.actualizeHosts(hosts)
            res.status(200).json(actualizedHosts)
        } catch (e) {
            next(e)
        }
    }
}