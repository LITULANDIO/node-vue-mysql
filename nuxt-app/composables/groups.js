import { DataProvider } from '@/data-provider/index'

export default () => {

    const addGuestInGroup = async (data) => {
        console.log('ADD GUEST =>', data)
        await DataProvider({
            providerType: 'GUESTS',
            type: 'INSERT_GUEST',
            params: JSON.parse(JSON.stringify(data))
        })
    } 

    return {
        addGuestInGroup,
    }
}