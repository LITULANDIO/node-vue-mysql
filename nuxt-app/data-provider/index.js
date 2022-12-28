import { getAPI } from './api/api'
import { AuthDataProvider } from './auth/AuthDataProvider'
import { UsersDataProvider } from './users/UsersDataProvider'

export const DataProvider = ({providerType, type, params}) => {
    let data = null;
    console.log('getAPI', getAPI())

    switch(providerType) {
        case "AUTH":
            data = AuthDataProvider({
                type,
                params,
                baseApiUrl: getAPI()
            });
            break;
        case "USERS": 
            data = UsersDataProvider({
                type,
                params,
                baseApiUrl: getAPI()
            });
            break;

        default: 
            break;
    }

    return data
}