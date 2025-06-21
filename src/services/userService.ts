class UserService {
    async getUsers() {
        return [
            {
                id: '1',
                name: 'Name1 Surname1',
                username: 'username1',
                password: 'password1',
            },
            {
                id: '2',
                name: 'Name2 Surname2',
                username: 'username2',
                password: 'password2',
            },
            {
                id: '3',
                name: 'Name3 Surname3',
                username: 'username3',
                password: 'password3',
            },
        ]
    }
}

export default new UserService();