import axios from './RequestObject';

const USER = 'api/user';
const AUTH = 'api/auth'

class AuthService {
    /**
     * Registers a user
     * @param {*} user the user to be registered
     */
    static registerUser(user) {
        return axios.post(USER, user)
    }
    /**
     * authenticates a user
     * @param {*} user the user credentials to authenticate
     */
    static loginUser(user) {
        return axios.post(AUTH, user)
        .then(response => {
            return {
                ...response.data,
            }
        })
        // .catch(err => err);
    }

}

export default AuthService;