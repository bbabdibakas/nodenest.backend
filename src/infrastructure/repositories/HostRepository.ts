import {PrismaClient} from '@prisma/client';
import {Host} from "../../core/entities/Host";
import {IHostRepository} from "../../core/interfaces/IHostRepository";

export class HostRepository implements IHostRepository {
    private prisma = new PrismaClient();

    async getHosts(): Promise<Host[]> {
        const hosts = await this.prisma.host.findMany()

        return hosts.map(
            (host) =>
                new Host(
                    host.id,
                    host.hostId,
                    host.name,
                    host.status,
                    host.created,
                    host.ip,
                    host.isIpBlocked,
                    host.isUnreachable,
                    host.isConfigFileExists,
                    host.wabaHealthStatusCode,
                    host.createdAt,
                    host.updatedAt
                )
        )

    }

    async deleteHostsByHostId(ids: number[]): Promise<void> {
        await this.prisma.host.deleteMany({
            where: {
                hostId: {in: ids}
            }
        });
    }

    async upsertHost(host: Host): Promise<Host> {
        const upserted = await this.prisma.host.upsert({
            where: {hostId: host.hostId},
            create: {
                hostId: host.hostId,
                name: host.name,
                status: host.status,
                created: host.created,
                ip: host.ip,
                isIpBlocked: host.isIpBlocked,
                isUnreachable: host.isUnreachable,
                isConfigFileExists: host.isConfigFileExists,
                wabaHealthStatusCode: host.wabaHealthStatusCode
            },
            update: {
                hostId: host.hostId,
                name: host.name,
                status: host.status,
                created: host.created,
                ip: host.ip,
                isIpBlocked: host.isIpBlocked,
                isUnreachable: host.isUnreachable,
                isConfigFileExists: host.isConfigFileExists,
                wabaHealthStatusCode: host.wabaHealthStatusCode
            },
        });

        return new Host(
            upserted.id,
            upserted.hostId,
            upserted.name,
            upserted.status,
            upserted.created,
            upserted.ip,
            upserted.isIpBlocked,
            upserted.isUnreachable,
            upserted.isConfigFileExists,
            upserted.wabaHealthStatusCode,
            upserted.createdAt,
            upserted.updatedAt
        );
    }
}

