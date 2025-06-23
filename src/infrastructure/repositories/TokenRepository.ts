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

    async updateToken(token: Token): Promise<Token> {
        const updated = await this.prisma.token.update({
            where: { id: token.id },
            data: { refreshToken: token.refreshToken },
        });

        return new Token(
            updated.id,
            updated.refreshToken,
            updated.userId,
            updated.createdAt,
            updated.updatedAt
        );
    }
}
