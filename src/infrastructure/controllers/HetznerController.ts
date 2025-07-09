import {Request, Response, NextFunction} from "express";
import {HetznerService} from "../../application/services/HetznerService";
import {injectable} from "tsyringe";

@injectable()
export class HetznerController {
    constructor(private hetznerService: HetznerService) {
    }

    async getServers(req: Request, res: Response, next: NextFunction) {
        try {
            const servers = await this.hetznerService.getServers();
            res.status(200).json(servers)
        } catch (e) {
            next(e)
        }
    }
}