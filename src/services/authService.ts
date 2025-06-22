import {PrismaClient} from "@prisma/client";
import ApiError from "../exceptions/apiError";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class AuthService {
    async login(username: string, password: string) {
        const user = await prisma.user.findUnique({where: {username: username}});
        if (!user) {
            throw ApiError.NotFound("User not found");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw ApiError.BadRequest("Invalid credentials")
        }

        return user;
    }
}