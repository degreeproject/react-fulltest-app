import axios from './RequestObject';

const USER = 'api/user';
const AUTH = 'api/auth'

class AuthService {
    /**
     * Gets necessary information for application receipt
     */
    static registerUser(user) {
        return axios.post(USER, user)
    }
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