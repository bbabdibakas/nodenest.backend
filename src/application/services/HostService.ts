import {IHostRepository, IHostRepositoryToken} from "../../core/interfaces/IHostRepository";
import {Host} from "../../core/entities/Host";
import {CreateHostDTO} from "../../infrastructure/controllers/HostController";
import {inject, injectable} from "tsyringe";

@injectable()
export class HostService {
    constructor(
        @inject(IHostRepositoryToken) private hostRepository: IHostRepository,
    ) {
    }

    async getHosts(): Promise<Host[]> {
        return this.hostRepository.getHosts()
    }

    async deleteHostsByHostId(ids: number[]) {
        return this.hostRepository.deleteHostsByHostId(ids)
    }

    async actualizeHosts(hosts: CreateHostDTO[]): Promise<Host[]> {
        let actualizedHosts:Host[] = []

        for (const host of hosts) {
            const actualizedHost = await this.saveHost(host)
            actualizedHosts.push(actualizedHost)
        }

        const allHosts = await this.getHosts();
        const actualizedHostIds = new Set(actualizedHosts.map(h => h.hostId));

        const toDelete = allHosts.filter(h => !actualizedHostIds.has(h.hostId));
        const toDeleteIds = toDelete.map(h => h.hostId);

        await this.deleteHostsByHostId(toDeleteIds)

        return actualizedHosts
    }

    async saveHost(hostData: CreateHostDTO): Promise<Host> {
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
        return this.hostRepository.upsertHost(candidateHost);
    }
}