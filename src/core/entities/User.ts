import {Token} from './Token'

export class User {
    constructor(
        public id: number,
        public name: string,
        public username: string,
        public password: string,
        public createdAt: Date,
        public updatedAt: Date,
        public tokens?: Token
    ) {
    }
}