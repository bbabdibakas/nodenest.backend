export interface TokenEntity {
    id: number;
    refreshToken: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
}