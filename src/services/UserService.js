const axios = require('axios');

const USER = '/api/user'

class UserService {
    static getUser(){
        return axios.get(USER)
        .then(function (response) {
            return {
                ...response,
            }
        })
    }
}
export default UserService;