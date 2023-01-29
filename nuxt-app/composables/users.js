import { DataProvider } from '@/data-provider/index'

export default () => {

    const getAllUsers = async function() {
        const result = await DataProvider({
            providerType: 'AUTH',
            type: 'GET_USERS',
          })
          console.log('result =>', {result})
        return result.data.body   
    }

    return {
        getAllUsers
    }
}

