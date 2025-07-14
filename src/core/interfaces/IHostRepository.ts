import {Host} from "../entities/Host";

export interface IHostRepository {
    getHosts(): Promise<Host[]>;

    upsertHost(host: Host): Promise<Host>;

    deleteHostsByHostId(ids: number[]): Promise<void>;
}

export const IHostRepositoryToken = "IHostRepository";