import { DataProvider } from '@/data-provider/index'

export default () => {

    const getGroups = async (id) => {
       const groups = await DataProvider({
            providerType: 'GROUPS',
            type: 'GET_GROUPS',
        })
       return groups.body.filter(group => group.admin === id)
    }

    const addGuestInGroup = async (data) => {
        console.log('data =>', data)
        await DataProvider({
            providerType: 'GUESTS',
            type: 'INSERT_GUEST',
            params: JSON.parse(JSON.stringify(data))
        })
    }

    const getGuests = async (id) => {
        const guests = await DataProvider({
            providerType: 'GUESTS',
            type: 'GET_GUESTS',
            params: id
        })
        return guests
    }
 

    return {
        getGroups,
        addGuestInGroup,
        getGuests
    }
}