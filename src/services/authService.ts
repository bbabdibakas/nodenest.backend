class AuthService {
    async login(username: string, password: string) {
        if (username === 'admin' && password === 'admin_password') {
            return {
                token: 'token_hash_example'
            };
        } else {
            return null
        }
    }
}

export default new AuthService();