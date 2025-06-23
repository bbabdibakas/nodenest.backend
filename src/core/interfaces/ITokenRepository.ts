import {Token} from "../entities/Token";

export interface ITokenRepository {
    createToken(token: Token): Promise<Token>;
    updateToken(token: Token): Promise<Token>;
}