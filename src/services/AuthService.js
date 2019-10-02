import axios from 'axios';
// import {authHeader} from '../helpers'

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
        return axios.get(AUTH, {
            params: user
        }).then(response => {
            // localStorage.setItem('user', JSON.stringify(user));
            return {
                ...response.data,
                name: user.username,
            }
        })
        // .catch(err => err);
    }

}

export default AuthService;