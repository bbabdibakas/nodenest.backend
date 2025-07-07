export type HostStatus = 'initializing' | 'running' | 'deleting' | 'offline' | 'starting' | 'stopping' | 'error';

export class Host {
    constructor(
        public id: number,
        public hostId: number,
        public name: string,
        public status: HostStatus,
        public created: Date,
        public ip: string,
        public isIpBlocked: boolean,
        public isUnreachable: boolean | null,
        public isConfigFileExists: boolean | null,
        public wabaHealthStatusCode: number | null,
        public createdAt: Date,
        public updatedAt: Date
    ) {
    }
}