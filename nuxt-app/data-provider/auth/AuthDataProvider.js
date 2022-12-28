import axios from 'axios'
import AuthStore from '@/composables/auth'
const { setToken } = AuthStore()

export const AuthDataProvider = ({ type, params, baseApiUrl }) => {
    let options = null
    console.log({params})
    switch(type) {
        case "LOGIN": 
            if (baseApiUrl) {
                options = {
                    method: "POST",
                    url: `${baseApiUrl}/auth/login`,
                    data: params
                }
            } else {
                throw new Error('Error baseApiUrl are necessary')
            }
            break;
        case "LOGOUT":
            if (baseApiUrl) {
                options = {
                    method: "GET",
                    url: `${baseApiUrl}/logout`
                }
            } else {
                throw new Error('Error baseApiUrl are necessary')
            }
            break;   
    }

    if (!!options) {
        let response = axios(options)
            .then((res) => {
                setToken(res.data.body.token)
                return res
            })
            .catch(error => {
                console.error(`Error calling the url ${options.url} using the the method ${options.method}`, error);
            })

        return response;

    } else {
        console.error("Unsupported Data Provider request parameters");
    }


}