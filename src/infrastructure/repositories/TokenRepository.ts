import { PrismaClient } from '@prisma/client';
import { ITokenRepository } from '../../core/interfaces/ITokenRepository';
import { Token } from '../../core/entities/Token';

export class TokenRepository implements ITokenRepository {
    private prisma = new PrismaClient();

    async createToken(token: Token): Promise<Token> {
        const created = await this.prisma.token.create({
            data: {
                refreshToken: token.refreshToken,
                userId: token.userId,
            },
        });

        return new Token(
            created.id,
            created.refreshToken,
            created.userId,
            created.createdAt,
            created.updatedAt
        );
    }

    async upsertToken(token: Token): Promise<Token> {
        const upserted = await this.prisma.token.upsert({
            where: { userId: token.userId },
            create: {
                refreshToken: token.refreshToken,
                userId: token.userId,
            },
            update: {
                refreshToken: token.refreshToken,
            },
        });

        return new Token(
            upserted.id,
            upserted.refreshToken,
            upserted.userId,
            upserted.createdAt,
            upserted.updatedAt
        );
    }
}
