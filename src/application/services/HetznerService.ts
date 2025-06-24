import AxiosInstance = Axios.AxiosInstance;
import axios from 'axios';
import {EnvService} from "./EnvService";

interface HetznerServer {
    id: number;
    name: string;
    status: 'initializing' | 'running' | 'deleting' | 'offline' | 'starting' | 'stopping' | 'error';
    created: string; // ISO 8601 дата
    server_type: {
        id: number;
        name: string;
        description: string;
        cores: number;
        memory: number; // в МБ
        disk: number;   // в ГБ
        storage_type: string; // например "local" или "network"
        cpu_type: string;     // например "shared" или "dedicated"
    };
    public_net: {
        ipv4: {
            ip: string;
            blocked: boolean;
            dns_ptr: string;
        };
        ipv6: {
            ip: string;
            blocked: boolean;
            dns_ptr: string;
            network: string;
            gateway: string;
        } | null;
    };
    datacenter: {
        id: number;
        name: string;
        location: {
            id: number;
            name: string;
            city: string;
            country: string;
            continent: string;
            latitude: number;
            longitude: number;
        };
    };
    rescue_enabled: boolean;
    locked: boolean;
    backup_window: string | null;
    included_traffic: number; // в ГБ
    outgoing_traffic: number; // в ГБ
    ingoing_traffic: number;  // в ГБ
    protection: {
        delete: boolean;
        rebuild: boolean;
    };
    iso: {
        id: number;
        name: string;
        description: string;
        type: string; // iso type
    } | null;
    labels: Record<string, string>;
    volumes: number[]; // массив id томов, подключённых к серверу
    images: number[];  // массив id образов
    // Если нужны другие поля — можно добавить
}

interface FilteredHetznerServer {
    id: number;
    name: string;
    status: HetznerServer['status'];
    created: string;
    publicNetIPv4: {
        ip: string;
        blocked: boolean;
    };
}

interface Pagination {
    page: number;
    per_page: number;
    previous_page: number | null;
    next_page: number | null;
    last_page: number;
    total_entries: number;
}

interface HetznerServersResponse {
    servers: HetznerServer[];
    meta: {
        pagination: Pagination;
    };
}

export class HetznerService {
    private axiosInstance: AxiosInstance;
    private readonly perPage = 30;

    constructor(
        private envService: EnvService
    ) {

        this.axiosInstance = axios.create({
            baseURL: this.envService.HETZNER_API_URL,
            headers: {
                Authorization: `Bearer ${this.envService.HETZNER_API_KEY}`,
            },
        });
    }

    async getServers() {
        let allServers: HetznerServer[] = [];
        let page = 1;

        while (true) {
            const response = await this.axiosInstance.get<HetznerServersResponse>('', {
                params: {
                    page,
                    per_page: this.perPage,
                }
            });

            allServers = allServers.concat(response.data.servers);

            const pagination = response.data.meta.pagination;

            if (pagination.next_page === null || page >= pagination.last_page) {
                break;
            }

            page = pagination.next_page;
        }

        const filteredServers: FilteredHetznerServer[] = allServers.map((server) => ({
            id: server.id,
            name: server.name,
            status: server.status,
            created: server.created,
            publicNetIPv4: {
                ip: server.public_net.ipv4.ip,
                blocked: server.public_net.ipv4.blocked,
            },
        }));

        return filteredServers;
    }
}