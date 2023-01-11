import { getAPI } from './api/api'
import { AuthDataProvider } from './auth/AuthDataProvider'
import { UsersDataProvider } from './users/UsersDataProvider'
import { GroupsDataProvider } from './groups/GroupsDataProvider'

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
        case "GROUPS": 
            data = GroupsDataProvider({
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