import {Host} from "../entities/Host";

export interface IHostRepository {
    createHost(token: Host): Promise<Host>;

    getHostById(id: number): Promise<Host | null>;

    getHostByHostId(id: number): Promise<Host | null>;

    getHostByName(name: string): Promise<Host | null>;

    getHostByIp(ip: string): Promise<Host | null>;
}