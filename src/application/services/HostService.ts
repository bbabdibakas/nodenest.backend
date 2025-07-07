import {IHostRepository} from "../../core/interfaces/IHostRepository";
import {Host} from "../../core/entities/Host";
import {CreateHostDTO} from "../../infrastructure/controllers/HostController";

export class HostService {
    constructor(
        private hostRepository: IHostRepository,
    ) {
    }

    async getHostById(id: number): Promise<Host | null> {
        return this.hostRepository.getHostById(id)
    }

    async getHostByHostId(hostId: number): Promise<Host | null> {
        return this.hostRepository.getHostByHostId(hostId)
    }

    async getHostByName(name: string): Promise<Host | null> {
        return this.hostRepository.getHostByName(name)
    }

    async getHostByIp(ip: string): Promise<Host | null> {
        return this.hostRepository.getHostByIp(ip)
    }

    async createHost(hostData: CreateHostDTO) {
        const candidateHost = new Host(
            0,
            hostData.hostId,
            hostData.name,
            hostData.status,
            hostData.created,
            hostData.ip,
            hostData.isIpBlocked,
            hostData.isUnreachable,
            hostData.isConfigFileExists,
            hostData.wabaHealthStatusCode,
            new Date(),
            new Date()
        )

        return this.hostRepository.createHost(candidateHost);
    }
}