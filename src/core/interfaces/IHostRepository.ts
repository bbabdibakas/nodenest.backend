import {Host} from "../entities/Host";

export interface IHostRepository {
    getHostById(id: number): Promise<Host | null>;

    getHostByHostId(id: number): Promise<Host | null>;

    getHostByName(name: string): Promise<Host | null>;

    getHostByIp(ip: string): Promise<Host | null>;

    getHosts(): Promise<Host[]>;

    createHost(token: Host): Promise<Host>;
}