import "reflect-metadata"
import {container} from "tsyringe";
import {UserService} from "../src/application/services/UserService";
import {IUserRepositoryToken} from "../src/core/interfaces/IUserRepository";
import {UserRepository} from "../src/infrastructure/repositories/UserRepository";
import {ITokenRepositoryToken} from "../src/core/interfaces/ITokenRepository";
import {TokenRepository} from "../src/infrastructure/repositories/TokenRepository";

export const main = async () => {
    container.register(IUserRepositoryToken, {
        useClass: UserRepository,
    });
    container.register(ITokenRepositoryToken, {
        useClass: TokenRepository,
    });

    const userService = container.resolve(UserService)
    const admin = await userService.seedAdminUser()


    console.log('Seed admin user successfully', admin.user)
}

main()
    .catch((e) => {
        console.error('Error seeding admin user:', e);
        process.exit(1);
    });