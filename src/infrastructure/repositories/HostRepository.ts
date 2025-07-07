import {PrismaClient} from '@prisma/client';
import {Host} from "../../core/entities/Host";
import {IHostRepository} from "../../core/interfaces/IHostRepository";

export class HostRepository implements IHostRepository {
    private prisma = new PrismaClient();

    async getHostById(id: number): Promise<Host | null> {
        const found = await this.prisma.host.findUnique({
            where: {id},
        });

        if (!found) return null;

        return new Host(
            found.id,
            found.hostId,
            found.name,
            found.status,
            found.created,
            found.ip,
            found.isIpBlocked,
            found.isUnreachable,
            found.isConfigFileExists,
            found.wabaHealthStatusCode,
            found.createdAt,
            found.updatedAt
        )
    }

    async getHostByHostId(hostId: number): Promise<Host | null> {
        const found = await this.prisma.host.findUnique({
            where: {hostId},
        });

        if (!found) return null;

        return new Host(
            found.id,
            found.hostId,
            found.name,
            found.status,
            found.created,
            found.ip,
            found.isIpBlocked,
            found.isUnreachable,
            found.isConfigFileExists,
            found.wabaHealthStatusCode,
            found.createdAt,
            found.updatedAt
        )
    }

    async getHostByName(name: string): Promise<Host | null> {
        const found = await this.prisma.host.findUnique({
            where: {name},
        });

        if (!found) return null;

        return new Host(
            found.id,
            found.hostId,
            found.name,
            found.status,
            found.created,
            found.ip,
            found.isIpBlocked,
            found.isUnreachable,
            found.isConfigFileExists,
            found.wabaHealthStatusCode,
            found.createdAt,
            found.updatedAt
        )
    }

    async getHostByIp(ip: string): Promise<Host | null> {
        const found = await this.prisma.host.findUnique({
            where: {ip},
        });

        if (!found) return null;

        return new Host(
            found.id,
            found.hostId,
            found.name,
            found.status,
            found.created,
            found.ip,
            found.isIpBlocked,
            found.isUnreachable,
            found.isConfigFileExists,
            found.wabaHealthStatusCode,
            found.createdAt,
            found.updatedAt
        )
    }

    async createHost(host: Host): Promise<Host> {
        const created = await this.prisma.host.create({
            data: {
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
            created.id,
            created.hostId,
            created.name,
            created.status,
            created.created,
            created.ip,
            created.isIpBlocked,
            created.isUnreachable,
            created.isConfigFileExists,
            created.wabaHealthStatusCode,
            created.createdAt,
            created.updatedAt
        );
    }
}

