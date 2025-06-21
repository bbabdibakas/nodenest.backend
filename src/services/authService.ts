class AuthService {
    async login(username: string, password: string) {
        if (username === 'admin' && password === 'admin_password') {

            return {
                user: {
                    id: '4',
                    name: 'Admin Admin',
                    username: 'admin',
                    password: 'admin_password',
                },
                token: 'token_hash_example'
            };
        } else {
            return null
        }
    }
}

export default new AuthService();