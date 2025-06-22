export interface UserDTO {
    id: number;
    name: string;
    username: string;
    createdAt: Date;
}

export interface CreateUserDTO {
    name: string;
    username: string;
    password: string;
}

export interface LoginDTO {
    username?: string;
    password?: string;
}