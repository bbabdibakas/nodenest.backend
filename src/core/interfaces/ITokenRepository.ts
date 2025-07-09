import {Token} from "../entities/Token";

export interface ITokenRepository {
    createToken(token: Token): Promise<Token>;

    upsertToken(token: Token): Promise<Token>;

    deleteToken(token: Token): Promise<Token>;
}

export const ITokenRepositoryToken = "ITokenRepository";