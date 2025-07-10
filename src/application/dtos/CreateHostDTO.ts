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