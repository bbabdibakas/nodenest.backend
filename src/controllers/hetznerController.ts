import {Request, Response, NextFunction} from 'express'
import {HetznerService} from "../services/hetznerService";

const hetznerService = new HetznerService();

class HetznerController {
    async getServers(req: Request, res: Response, next: NextFunction) {
        try {
            const servers = await hetznerService.getServers()
            res.status(200).json(servers)
        } catch (e) {
            next(e)
        }
    }
}

export default new HetznerController();