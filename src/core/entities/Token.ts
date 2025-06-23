export class Token {
    constructor(
        public id: number,
        public refreshToken: string,
        public userId: number,
        public createdAt: Date,
        public updatedAt: Date
    ) {
    }
}