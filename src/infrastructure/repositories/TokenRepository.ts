import {PrismaClient} from '@prisma/client';
import {ITokenRepository} from '../../core/interfaces/ITokenRepository';
import {Token} from '../../core/entities/Token';
import {injectable} from "tsyringe";

@injectable()
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
            where: {userId: token.userId},
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

    async deleteToken(token: Token): Promise<Token> {
        const deleted = await this.prisma.token.delete({
            where: {userId: token.userId},
        })

        return new Token(
            deleted.id,
            deleted.refreshToken,
            deleted.userId,
            deleted.createdAt,
            deleted.updatedAt
        )
    }
}
