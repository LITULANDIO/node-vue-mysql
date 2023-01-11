import { DataProvider } from '@/data-provider/index'

export default () => {

    const getGroups = async (id) => {
       const groups = await DataProvider({
            providerType: 'GROUPS',
            type: 'GET_GROUPS',
        })
       return groups.body.filter(group => group.admin === id)
    }


    return {
        getGroups
    }
}