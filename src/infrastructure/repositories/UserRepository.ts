import {PrismaClient} from "@prisma/client";
import {IUserRepository} from "../../core/interfaces/IUserRepository";
import {User} from "../../core/entities/User";

export class UserRepository implements IUserRepository {
    private prisma = new PrismaClient()

    async createUser(user: User): Promise<User> {
        const created = await this.prisma.user.create({
            data: {
                name: user.name,
                username: user.username,
                password: user.password,
            }
        });

        return new User(
            created.id,
            created.name,
            created.username,
            created.password,
            created.createdAt,
            created.updatedAt,
        );
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const found = await this.prisma.user.findUnique({
            where: {username},
        });

        if (!found) return null;

        return new User(
            found.id,
            found.name,
            found.username,
            found.password,
            found.createdAt,
            found.updatedAt
        );
    }

    async getUsers(): Promise<User[]> {
        const users = await this.prisma.user.findMany();

        return users.map(
            (user) =>
                new User(
                    user.id,
                    user.name,
                    user.username,
                    user.password,
                    user.createdAt,
                    user.updatedAt
                )
        );
    }
}